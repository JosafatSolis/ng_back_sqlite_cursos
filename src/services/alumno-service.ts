import alumnoRepo from "@repos/alumno-repo";
import { AlumnoItem } from "@models/alumno-item";
import { AlumnoDTO } from "@models/alumno-dto";
import { AlumnoNotFounderror } from "@shared/errors";
import { CursoItem } from "../models/curso-item";
import inscripcionService from "@services/inscripcion-service";
import { rejects } from "assert";

async function getAll(withCursos: boolean = false): Promise<AlumnoItem[]> {
  if (!withCursos) {
    return alumnoRepo.getAll().then((alumnos) => {
      return alumnos.map((alumno) => {
        return {
          id: alumno.id,
          nombre: alumno.nombre,
          apellidos: alumno.apellidos,
          email: alumno.email,
          fechaNacimiento: new Date(alumno.fechaNacimiento),
          genero: alumno.genero,
        } as AlumnoItem;
      });
    });
  }
  const alumnos = await alumnoRepo.getAll();
  let promises: Promise<AlumnoItem>[] = [];
  alumnos.forEach((alumno_dto) => {
    promises.push(
      new Promise<AlumnoItem>(function (resolve) {
        let newAlumno = {
          id: alumno_dto.id,
          matricula: alumno_dto.matricula,
          nombre: alumno_dto.nombre,
          apellidos: alumno_dto.apellidos,
          email: alumno_dto.email,
          fechaNacimiento: new Date(alumno_dto.fechaNacimiento),
          genero: alumno_dto.genero,
        } as AlumnoItem;
        inscripcionService
          .getAll(alumno_dto.id.toString())
          .then((inscripciones) => {
            let cs = inscripciones.map((inscripcion) => {
              return inscripcion.curso;
            });
            newAlumno.cursos = cs;
            resolve(newAlumno);
          });
      })
    );
  });
  return await Promise.all(promises).then((alumnos_con_cursos) => {
    return alumnos_con_cursos;
  });
}

async function getOne(
  id: number,
  withCursos: boolean
): Promise<AlumnoItem | null> {
  const alumno = await alumnoRepo.getOne(id);
  if (!alumno) {
    throw new AlumnoNotFounderror();
  }
  let cursos: CursoItem[] = [];
  if (withCursos) {
    // Obtenemos los cursos del alumno
    const inscripciones = await inscripcionService.getAll(id.toString());
    // From each inscription, get the curso and assign to cursos
    cursos = inscripciones.map((inscripcion) => {
      return inscripcion.curso;
    });
  }
  const resp = {
    id: alumno.id,
    matricula: alumno.matricula,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: new Date(alumno.fechaNacimiento),
    genero: alumno.genero,
    cursos: cursos,
  } as AlumnoItem;
  return Promise.resolve(resp);
}

function addOne(alumno: AlumnoItem): Promise<void> {
  return alumnoRepo.add({
    id: alumno.id,
    matricula: alumno.matricula,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: alumno.fechaNacimiento.toISOString().slice(0, 10),
    genero: alumno.genero,
  } as AlumnoDTO);
  // Add alumno cursos
}

async function updateOne(alumno: AlumnoItem): Promise<void> {
  // Pendiente:
  // 1. Obtener los cursos del alumno
  // 2. Eliminar los cursos del alumno
  // 3. Añadir los cursos del alumno
  const persists = await alumnoRepo.persists(alumno.id);
  if (!persists) {
    throw new AlumnoNotFounderror();
  }
  return alumnoRepo.update({
    id: alumno.id,
    matricula: alumno.matricula,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: alumno.fechaNacimiento.toISOString().slice(0, 10),
    genero: alumno.genero,
  } as AlumnoDTO);
}

async function deleteOne(id: number): Promise<void> {
  const persists = await alumnoRepo.persists(id);
  if (!persists) {
    throw new AlumnoNotFounderror();
  }
  return alumnoRepo.deleteOne(id);
}

export default { getAll, getOne, addOne, updateOne, deleteOne } as const;
