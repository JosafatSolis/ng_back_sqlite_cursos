import alumnoRepo from "@repos/alumno-repo";
import { AlumnoItem } from "@models/alumno-item";
import { AlumnoDTO } from "@models/alumno-dto";
import { AlumnoNotFounderror } from "@shared/errors";
import { CursoItem } from "../models/curso-item";
import inscripcionService from "@services/inscripcion-service";

// Returns a Promise that resolves to an array of AlumnoItem, without the cursos
function getAll(): Promise<AlumnoItem[]> {
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

async function getOne(id: number): Promise<AlumnoItem | null> {
  const alumno = await alumnoRepo.getOne(id);
  if (!alumno) {
    throw new AlumnoNotFounderror();
  } 
  // Obtenemos los cursos del alumno
  const inscripciones = await inscripcionService.getAll(id.toString());
  // From each inscription, get the curso and assign to cursos
  let cursos: CursoItem[] = inscripciones.map((inscripcion) => {
    return inscripcion.curso;
  });
  const resp = {
    id: alumno.id,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: new Date(alumno.fechaNacimiento),
    genero: alumno.genero,
    cursos: cursos,
  } as AlumnoItem
  return Promise.resolve(resp);
}

function addOne(alumno: AlumnoItem): Promise<void> {
  return alumnoRepo.add({
    id: alumno.id,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: alumno.fechaNacimiento.toISOString().slice(0, 10),
    genero: alumno.genero
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
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    email: alumno.email,
    fechaNacimiento: alumno.fechaNacimiento.toISOString().slice(0, 10),
    genero: alumno.genero
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
