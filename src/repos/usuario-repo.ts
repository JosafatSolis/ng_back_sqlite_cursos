import { UsuarioItem } from "@models/usuario-item";
import abre_bd from "./common-repos";

let dbo: any;

function getOne(id: number): Promise<UsuarioItem | null> {
  return new Promise<UsuarioItem | null>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (err: any, rows: UsuarioItem[]) => {
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

function persists(id: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (err: any, rows: UsuarioItem[]) => {
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

function getAll(): Promise<UsuarioItem[]> {
  return new Promise<UsuarioItem[]>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all("SELECT * FROM usuarios", (err: any, rows: UsuarioItem[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function add(usuario: UsuarioItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "INSERT INTO usuarios (username, nombre, pwd, alumnosCUD, cursosCUD, inscripcionesCUD, usuariosCUD) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          usuario.username,
          usuario.nombre,
          usuario.pwd,
          usuario.alumnosCUD,
          usuario.cursosCUD,
          usuario.inscripcionesCUD,
          usuario.usuariosCUD
        ],
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

function update(usuario: UsuarioItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "UPDATE usuarios SET username = ?, nombre = ?, pwd = ?, alumnosCUD = ?, cursosCUD = ?, inscripcionesCUD = ?, usuariosCUD = ? WHERE id = ?",
        [
          usuario.username,
          usuario.nombre,
          usuario.pwd,
          usuario.alumnosCUD,
          usuario.cursosCUD,
          usuario.inscripcionesCUD,
          usuario.usuariosCUD,
          usuario.id
        ],
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

function deleteOne(id: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "DELETE FROM usuarios WHERE id = ?",
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

export default { getOne, getAll, add, update, deleteOne, persists };