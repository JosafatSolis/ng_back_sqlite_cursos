import inscripcionRepo from "@repos/inscripcion-repo";
import { InscripcionItem } from "@models/inscripcion-item";
import { InscripcionNotFoundError } from "@shared/errors";
import cursoService from "./curso-service";
import { AlumnoItem } from "@models/alumno-item";

function getAll(alumno_id?: string, curso_id ?: string): Promise<InscripcionItem[]> {
  // let resp: Promise<InscripcionItem[]>;
  console.log('alumno:', alumno_id, 'curso:', curso_id);
  // let inscripciones = await inscripcionRepo.getAll(alumno_id, curso_id);
  // inscripciones.forEach(inscripcion => {
  //   inscripcion.curso = await cursoService.getOne(inscripcion.curso);
  return inscripcionRepo.getAll(alumno_id, curso_id);
  // });
  return inscripcionRepo.getAll(alumno_id, curso_id);
}

function getOne(id: number): Promise<InscripcionItem | null> {
  return inscripcionRepo.getOne(id);
}

async function addOne(inscripcion: InscripcionItem): Promise<void> {
    return inscripcionRepo.add(inscripcion);
}

async function updateOne(inscripcion: InscripcionItem): Promise<void> {
    const persists = await inscripcionRepo.persists(inscripcion.id);
    if (!persists) {
        throw new InscripcionNotFoundError();
    }
    return inscripcionRepo.update(inscripcion);
}

async function deleteOne(id: number): Promise<void> {
  const persists = await inscripcionRepo.persists(id);
  if (!persists) {
    throw new InscripcionNotFoundError();
  }
  return inscripcionRepo.deleteOne(id);
}

export default { getAll, getOne, addOne, updateOne, deleteOne } as const;