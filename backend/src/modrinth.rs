/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

use anyhow::Result;
use bytes::Bytes;
use reqwest::Client;
use serde::Deserialize;
use url::form_urlencoded::byte_serialize;

#[derive(Deserialize, Debug)]
struct ModrinthVersion {
  files: Vec<ModrinthFile>,
}

#[derive(Deserialize, Debug)]
struct ModrinthFile {
  url: String,
  filename: String,
  primary: bool,
}

pub async fn download_mod(mod_id: &str, version: &str) -> Result<(String, Bytes)> {
  let client = Client::new();

  let versions = client
    .get(format!(
      "https://api.modrinth.com/v2/project/{}/version",
      byte_serialize(mod_id.as_bytes()).collect::<String>()
    ))
    .query(&[
      ("loaders", "[\"quilt\", \"fabric\"]"),
      ("game_versions", &format!("[\"{}\"]", version)),
    ])
    .send()
    .await
    .expect("Failed to fetch modrinth API")
    .json::<Vec<ModrinthVersion>>()
    .await?;

  if versions.len() == 0 {
    return Err(anyhow::Error::msg("No versions found"));
  }

  let file = versions[0]
    .files
    .iter()
    .find(|f| f.primary)
    .or(versions[0].files.first())
    .expect("Modrinth API returned invalid data");

  let mod_file = client.get(&file.url).send().await?.bytes().await?;

  Ok((file.filename.to_string(), mod_file))
}
