/*
This file is part of UnoPack.

UnoPack is free software: you can redistribute it and/or modify it under the terms of version 3 of GNU Affero Public License as published by the Free Software Foundation.

UnoPack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.

You should have received a copy of the GNU Affero Public License along with UnoPack. If not, see <https://www.gnu.org/licenses/>.
*/

use sqlx::SqlitePool;
use std::env;

pub async fn connect_to_db() -> SqlitePool {
  let pool =
    SqlitePool::connect(&env::var("DATABASE_URL").expect("DATABASE_URL env var is not set"))
      .await
      .expect("Failed to connect to database");
  sqlx::query(
    "CREATE TABLE IF NOT EXISTS download_count (
      pack TEXT PRIMARY KEY,
      value INTEGER NOT NULL DEFAULT 0
    )",
  )
  .execute(&pool)
  .await
  .expect("Failed to init database");
  pool
}

pub async fn increment_db_count(db: &SqlitePool, pack: &str) {
  sqlx::query(
      "INSERT INTO download_count (pack, value) VALUES (?, 1) ON CONFLICT(pack) DO UPDATE SET value = value + 1"
    )
    .bind(pack)
    .execute(db)
    .await
    .expect("Failed to update download count");
}
