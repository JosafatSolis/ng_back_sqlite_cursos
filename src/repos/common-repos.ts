const path = require("path");
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export default function (dbo: any): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    if (!dbo) {
      dbo = open({
        filename: path.join(__dirname, "../assets", "test.db"),
        driver: sqlite3.Database,
      });
    }
    return dbo;
  };
  