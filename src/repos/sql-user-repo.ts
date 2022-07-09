import { IUser } from "../models/user-model";
const path = require("path");
import sqlite3, { Database, Statement } from "sqlite3";
import { open } from "sqlite";

var dbo: any;

const abre_bd = function () {
  if (!dbo) {
    dbo = open({
      filename: path.join(__dirname, "../assets", "test.db"),
      driver: sqlite3.Database,
    });
  }
};

function getOne(email: string): Promise<IUser | null> {
  return new Promise<IUser | null>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err: any, rows: IUser[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows.length == 1 ? rows[0] : null);
          }
        }
      );
    });
  });
}

// See if a user with the given id exists.
function persists(id: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err: any, rows: IUser[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows.length == 1);
          }
        }
      );
    });
  });
}

function getAll(): Promise<IUser[]> {
  return new Promise<IUser[]>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.all("SELECT * FROM users", (err: any, rows: IUser[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

// Add one user.
function add(user: IUser): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.run(
        "INSERT INTO users (id, email, name) VALUES (?, ?, ?)",
        [user.id, user.email, user.name],
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });
}

// Update a user.
function update(user: IUser): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.run(
        "UPDATE users SET email = ?, name = ? WHERE id = ?",
        [user.email, user.name, user.id],
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });
}

// Delete one user.
function deleteOne(id: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    abre_bd();
    dbo.then((i: any) => {
      i.db.run(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });
}

export default { getOne, persists, getAll, add, update, deleteOne };
