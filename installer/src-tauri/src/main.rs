// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use rand::{distributions::Alphanumeric, thread_rng, Rng};
use reqwest;
use std::{
  env,
  env::consts::OS,
  fs::{create_dir_all, File},
  io::{copy, Read, Write},
  path::PathBuf,
};
use tauri::{
  api::{dialog::blocking::FileDialogBuilder, process::Command},
  Builder,
};
use tempfile::NamedTempFile;
use zip::read::ZipArchive;

#[tauri::command]
async fn find_default_minecraft_path() -> Option<PathBuf> {
  let mut minecraft_path: PathBuf;
  match OS {
    "windows" => {
      minecraft_path = PathBuf::from(env::var("APPDATA").expect("APPDATA not found"));
      minecraft_path.push(".minecraft");
    }
    "linux" => {
      minecraft_path = PathBuf::from(env::var("HOME").expect("HOME not found"));
      minecraft_path.push(".minecraft");
    }
    "macos" => {
      minecraft_path = PathBuf::from(env::var("HOME").expect("HOME not found"));
      minecraft_path.push("Library/Application Support/minecraft");
    }
    _ => {
      panic!("Unsupported OS")
    }
  }
  if minecraft_path.is_dir() {
    Some(minecraft_path)
  } else {
    None
  }
}

#[tauri::command]
async fn folder_picker() -> Option<PathBuf> {
  FileDialogBuilder::new().pick_folder()
}

#[tauri::command]
async fn zip_file_picker() -> Option<PathBuf> {
  FileDialogBuilder::new()
    .add_filter("zip", &["zip"])
    .pick_file()
}

#[tauri::command]
async fn install(archive_path: String, minecraft_path_string: String) -> Result<(), String> {
  let minecraft_path = PathBuf::from(&minecraft_path_string);
  if !minecraft_path.is_dir() {
    return Err("Invalid Minecraft Path".to_string());
  }
  if Command::new("java").args(["-version"]).output().is_err() {
    return Err("Java is not installed".to_string());
  }
  let file = File::open(&archive_path)
    .ok()
    .ok_or("Can't read the archive")?;
  let mut archive = ZipArchive::new(file).ok().ok_or("Can't read the archive")?;
  let mut pack_info_string = String::new();
  archive
    .by_name("unopack.json")
    .ok()
    .ok_or("Incompatible modpack")?
    .read_to_string(&mut pack_info_string)
    .ok()
    .ok_or("Incompatible modpack")?;
  let pack_info: serde_json::Value = serde_json::from_str(&pack_info_string)
    .ok()
    .ok_or("Incompatible modpack")?;
  let minecraft_version = pack_info["options"]["version"]
    .as_str()
    .ok_or("Incompatible modpack")?;
  let mods_path = PathBuf::from(&minecraft_path).join("mods");
  if mods_path.is_dir() {
    std::fs::rename(
      &mods_path,
      &PathBuf::from(&minecraft_path).join(format!(
        "mods.unopack_backup.{}",
        thread_rng()
          .sample_iter(Alphanumeric)
          .take(5)
          .map(char::from)
          .collect::<String>()
      )),
    )
    .ok()
    .ok_or("Failed to backup the mods folder")?;
  }
  let mut quilt_installer = NamedTempFile::new()
    .ok()
    .ok_or("Failed to create temporary file")?;
  // let quilt_versions = reqwest::get("https://storage.yandexcloud.net/unopack/quilt/version.json")
  //   .await
  //   .ok()
  //   .ok_or("Failed to download configurations from UnoPack server")?
  //   .json::<serde_json::Value>()
  //   .await
  //   .ok()
  //   .ok_or("Failed to download configurations from UnoPack server")?;
  // let quilt_version = quilt_versions[minecraft_version]
  //   .as_str()
  //   .ok_or("Unsupported Minecraft version")?;
  let quilt_version = "1.20.2";
  quilt_installer
    .write_all(
      &reqwest::get("https://quiltmc.org/api/v1/download-latest-installer/java-universal")
        .await
        .ok()
        .ok_or("Failed to download quilt installer")?
        .bytes()
        .await
        .ok()
        .ok_or("Failed to download quilt installer")?,
    )
    .ok()
    .ok_or("Failed to download quilt installer")?;
  quilt_installer
    .flush()
    .ok()
    .ok_or("Failed to download quilt installer")?;
  Command::new("java")
    .args([
      "-jar",
      quilt_installer
        .path()
        .to_str()
        .ok_or("Failed to install quilt")?,
      "install",
      "client",
      minecraft_version,
      quilt_version,
      &format!("--install-dir={}", &minecraft_path_string),
    ])
    .status()
    .ok()
    .ok_or("Failed to install quilt")?;

  for i in 0..archive.len() {
    let mut file = archive
      .by_index(i)
      .ok()
      .ok_or("The zip file is corrupted")?;
    let path = match file
      .enclosed_name()
      .map(|n| n.strip_prefix(".minecraft/").ok())
      .flatten()
      .map(|p| minecraft_path.join(p))
    {
      Some(n) => n,
      None => continue,
    };
    if let Some(p) = path.parent() {
      if !p.is_dir() {
        create_dir_all(p).ok().ok_or("Failed to extract modpack")?;
      }
    }
    let mut new_file = File::create(path).map_err(|e| e.to_string())?;
    copy(&mut file, &mut new_file)
      .ok()
      .ok_or("Failed to extract modpack")?;
  }
  Ok(())
}

fn main() {
  Builder::default()
    .invoke_handler(tauri::generate_handler![
      folder_picker,
      zip_file_picker,
      find_default_minecraft_path,
      install
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
