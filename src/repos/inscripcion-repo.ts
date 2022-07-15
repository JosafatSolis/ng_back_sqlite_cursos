import { InscripcionItem } from "@models/inscripcion-item";
import abre_bd from "./common-repos";
import { InscripcionDTO } from '../models/inscripcion-dto';

let dbo: any;

function getOne(id: number): Promise<InscripcionItem | null> {
  return new Promise<InscripcionItem | null>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM inscripciones WHERE id = ?",
        [id],
        (err: any, rows: InscripcionItem[]) => {
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
        "SELECT * FROM inscripciones WHERE id = ?",
        [id],
        (err: any, rows: InscripcionItem[]) => {
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

function getAll(alumno_id?: string, curso_id?: string): Promise<InscripcionDTO[]> {
  return new Promise<InscripcionDTO[]>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      let sql = "SELECT * FROM inscripciones";
      sql = alumno_id || curso_id ? sql + " WHERE" : sql;
      sql = alumno_id ? sql + " alumno = ?" : sql;
      sql = curso_id ? sql + (alumno_id ? " AND" : "") + " curso = ?" : sql;
      console.log(sql);
      let args = [];
      if (alumno_id) {
        args.push(alumno_id);
      }
      if (curso_id) {
        args.push(curso_id);
      }
      i.db.all(sql, args, (err: any, rows: InscripcionDTO[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function add(inscripcion: InscripcionItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "INSERT INTO inscripciones (alumno, curso, fechaInscripcion, fechaBorrado, inscritoPor, borradoPor) VALUES (?, ?, ?, ?, ?, ?)",
        [
          inscripcion.alumno.id,
          inscripcion.curso.id,
          inscripcion.fechaInscripcion,
          //inscripcion.fechaBorrado ? inscripcion.fechaBorrado : null,
          inscripcion.fechaBorrado,
          inscripcion.inscritoPor.id,
          inscripcion.borradoPor?.id
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

function update(inscripcion: InscripcionItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "UPDATE inscripciones SET alumno = ?, curso = ?, fechaInscripcion = ?, fechaBorrado = ?, inscritoPor = ?, borradoPor = ? WHERE id = ?",
        [
          inscripcion.alumno.id,
          inscripcion.curso.id,
          inscripcion.fechaInscripcion,
          inscripcion.fechaBorrado,
          inscripcion.inscritoPor.id,
          inscripcion.borradoPor?.id,
          inscripcion.id
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
        "DELETE FROM inscripciones WHERE id = ?",
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