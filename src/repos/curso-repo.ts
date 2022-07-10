import { CursoItem } from "@models/curso-item";
import abre_bd from "./common-repos";

let dbo: any;

function getOne(id: number): Promise<CursoItem | null> {
  return new Promise<CursoItem | null>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM cursos WHERE id = ?",
        [id],
        (err: any, rows: CursoItem[]) => {
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
        "SELECT * FROM cursos WHERE id = ?",
        [id],
        (err: any, rows: CursoItem[]) => {
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

function getAll(): Promise<CursoItem[]> {
  return new Promise<CursoItem[]>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all("SELECT * FROM cursos", (err: any, rows: CursoItem[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function add(curso: CursoItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "INSERT INTO cursos (nombre, fechaInicio, fechaFin, creditos, descripcion) VALUES (?, ?, ?, ?, ?)",
        [curso.nombre, curso.fechaInicio, curso.fechaFin, curso.creditos, curso.descripcion],
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

function update(curso: CursoItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "UPDATE cursos SET nombre = ?, fechaInicio = ?, fechaFin = ?, creditos = ?, descripcion = ? WHERE id = ?",
        [curso.nombre, curso.fechaInicio, curso.fechaFin, curso.creditos, curso.descripcion, curso.id],
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
        "DELETE FROM cursos WHERE id = ?",
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