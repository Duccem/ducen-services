import * as SQLite from 'expo-sqlite';
export class SQLiteConnection {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  get connection() {
    return this.db;
  }
}
