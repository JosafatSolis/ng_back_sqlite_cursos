import { IUser } from "../models/user-model";
const path = require("path");
import sqlite3, { Database, Statement } from "sqlite3";
import { open } from "sqlite";

// const abre_bd = function () {
//     open({
//       filename: "/test.db",
//       driver: sqlite3.Database,
//     }).then((db) => {
//       db.each("SELECT nombre FROM alumnos", (err, row) => {
//         console.log(row);
//       });
//     });
//   };

var dbo: any;

const abre_bd = function () {
  if (!dbo) {
    dbo = open({
      filename: path.join(__dirname, "../assets", "test.db"),
      driver: sqlite3.Database,
    });
  }
};

// async function getAll(): Promise<IUser[]> {
//   abre_bd();
//   const db = (await dbo).db;
//   db.all("SELECT * FROM users", (err: any, rows: IUser[]) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//       return rows;
//     }
//   });
//   return [];
// }

async function getAll(): Promise<IUser[]> {
  const resp = new Promise<IUser[]>((resolve, reject) => {
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
  return resp;
}

export default { getAll };
