/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

mod modrinth;
mod packer;
use aws_sdk_s3 as s3;
// mod db;
use axum::{
  // extract::State,
  http::{header, method::Method, HeaderValue, StatusCode},
  response::IntoResponse,
  routing::post,
  Router,
};
use base64::{engine::general_purpose, Engine as _};
use crypto_hash::{digest, Algorithm};
// use db::{connect_to_db, increment_db_count};
use dotenv::dotenv;
use modrinth::download_mod;
use packer::{add_directory_to_zip, add_file_to_zip};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, json};
// use sqlx::SqlitePool;
use std::{env, io::Cursor, time::SystemTime};
use tower_http::cors::CorsLayer;
use zip::write::ZipWriter;

#[tokio::main]
async fn main() {
  dotenv().ok();

  // let db = connect_to_db().await;

  let app = Router::new()
    .route("/getUrl", post(generate_pack_url))
    // .with_state(db)
    .layer(
      CorsLayer::new()
        .allow_origin(
          env::var("FRONTEND_ORIGIN")
            .expect("FRONTEND_ORIGIN env var is not set")
            .parse::<HeaderValue>()
            .expect("FRONTEND_ORIGIN env var is invalid"),
        )
        .allow_headers([header::CONTENT_TYPE])
        .allow_methods([Method::POST]),
    );

  println!("Starting server");

  axum::Server::bind(&"0.0.0.0:4000".parse().unwrap())
    .serve(app.into_make_service())
    .await
    .expect("failed to start server");
}

#[derive(Deserialize, Serialize, Clone)]
struct Options {
  features: Vec<String>,
  additional_mods: Vec<String>,
  version: String,
}

async fn generate_pack_url(
  // State(db): State<SqlitePool>,
  body: String,
) -> Result<impl IntoResponse, StatusCode> {
  let hash = general_purpose::URL_SAFE_NO_PAD.encode(digest(Algorithm::SHA256, body.as_bytes()));
  let s3_bucket = env::var("S3_BUCKET").expect("S3_BUCKET env var is not set");
  let s3_endpoint = env::var("S3_ENDPOINT").expect("S3_ENDPOINT env var is not set");
  let s3_client = s3::Client::from_conf(
    s3::Config::builder()
      .endpoint_url(s3_endpoint)
      .region(s3::config::Region::from_static("ru-central1"))
      .credentials_provider(s3::config::Credentials::new(
        env::var("S3_KEY_ID").expect("S3_KEY_ID env var is not set"),
        env::var("S3_ACCESS_KEY").expect("S3_ACCESS_KEY env var is not set"),
        None,
        None,
        &env::var("S3_PROVIDER").expect("S3_PROVIDER env var is not set"),
      ))
      .build(),
  );
  let filename = format!("unopack-{}.zip", &hash);
  let s3_url = format!("{}/{}/{}", s3_endpoint, s3_bucket, &filename);

  // increment_db_count(&db, &body).await;

  if s3_client
    .get_object()
    .bucket(S3_BUCKET)
    .key(&filename)
    .send()
    .await
    .is_ok()
  {
    Ok(s3_url)
  } else {
    if let Ok(options) = from_str::<Options>(&body) {
      let mut zip = ZipWriter::new(Cursor::new(Vec::new()));
      add_directory_to_zip(&mut zip, &format!("{}/base", &options.version), None);
      for feature in &options.features {
        add_directory_to_zip(
          &mut zip,
          &format!("{}/features/{}", &options.version, feature),
          Some(".minecraft"),
        );
      }
      for mod_ in &options
        .additional_mods
        .iter()
        .take(5)
        .cloned()
        .collect::<Vec<String>>()
      {
        match download_mod(&mod_, &options.version).await {
          Ok((filename, file_content)) => add_file_to_zip(
            &mut zip,
            &format!(".minecraft/mods/{}", filename),
            &file_content,
          ),
          Err(err) => println!("Failed to download mod {}: {}", mod_, err),
        }
      }

      add_file_to_zip(
        &mut zip,
        "unopack.json",
        &json!({
          "options": &options,
          "hash": hash,
          "generatedAt": SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
        })
        .to_string()
        .into(),
      );
      let result = zip.finish().unwrap().into_inner();
      s3_client
        .put_object()
        .bucket(S3_BUCKET)
        .key(&filename)
        .body(result.into())
        .send()
        .await
        .expect("Failed to upload file to S3");
      // std::fs::write(format!("{}.zip", hash), result).unwrap();
      Ok(s3_url)
    } else {
      Err(StatusCode::BAD_REQUEST)
    }
  }
}
