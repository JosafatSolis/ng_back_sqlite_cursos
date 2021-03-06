import { AlumnoDTO } from "@models/alumno-dto";
import abre_bd from "./common-repos";

let dbo: any;

function getOne(id: number): Promise<AlumnoDTO | null> {
  return new Promise<AlumnoDTO | null>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all(
        "SELECT * FROM alumnos WHERE id = ?",
        [id],
        (err: any, rows: AlumnoDTO[]) => {
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
        "SELECT * FROM alumnos WHERE id = ?",
        [id],
        (err: any, rows: AlumnoDTO[]) => {
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

function getAll(): Promise<AlumnoDTO[]> {
  return new Promise<AlumnoDTO[]>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.all("SELECT * FROM alumnos", (err: any, rows: AlumnoDTO[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function add(alumno: AlumnoDTO): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "INSERT INTO alumnos (matricula, nombre, apellidos, email, fechaNacimiento, genero) VALUES (?, ?, ?, ?, ?, ?)",
        [
          alumno.matricula,
          alumno.nombre,
          alumno.apellidos,
          alumno.email,
          alumno.fechaNacimiento,
          alumno.genero
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

function update(alumno: AlumnoDTO): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    dbo = abre_bd(dbo);
    dbo.then((i: any) => {
      i.db.run(
        "UPDATE alumnos SET matricula = ?, nombre = ?, apellidos = ?, email = ?, fechaNacimiento = ?, genero = ? WHERE id = ?",
        [
          alumno.matricula,
          alumno.nombre,
          alumno.apellidos,
          alumno.email,
          alumno.fechaNacimiento,
          alumno.genero,
          alumno.id
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
        "DELETE FROM alumnos WHERE id = ?",
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