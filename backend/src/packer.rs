/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

use bytes::Bytes;
use std::{
  fs::read,
  io::{Cursor, Write},
};
use walkdir::WalkDir;
use zip::ZipWriter;

pub fn add_directory_to_zip(
  zip: &mut ZipWriter<Cursor<Vec<u8>>>,
  directory: &str,
  folder: Option<&str>,
) {
  let directory = format!("./templates/{}/", directory);

  for entry in WalkDir::new(&directory).into_iter().filter_map(|e| e.ok()) {
    let path = entry.path();

    if entry.metadata().unwrap().is_file() {
      let filename = path.to_str().unwrap().strip_prefix(&directory).unwrap();

      zip
        .start_file(
          folder.map_or(filename.to_string(), |f| format!("{}/{}", f, filename)),
          Default::default(),
        )
        .unwrap();
      zip.write_all(&read(&path).unwrap()).unwrap();
    }
  }
}

pub fn add_file_to_zip(zip: &mut ZipWriter<Cursor<Vec<u8>>>, path: &str, content: &Bytes) {
  zip.start_file(path, Default::default()).unwrap();
  zip.write_all(content).unwrap();
}
