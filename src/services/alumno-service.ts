import alumnoRepo from "@repos/alumno-repo";
import { AlumnoItem } from "@models/alumno-item";
import { AlumnoNotFounderror } from "@shared/errors";

function getAll(): Promise<AlumnoItem[]> {
  return alumnoRepo.getAll();
}

function getOne(id: number): Promise<AlumnoItem | null> {
  return alumnoRepo.getOne(id);
}

function addOne(alumno: AlumnoItem): Promise<void> {
  return alumnoRepo.add(alumno);
}

async function updateOne(alumno: AlumnoItem): Promise<void> {
  const persists = await alumnoRepo.persists(alumno.id);
  if (!persists) {
    throw new AlumnoNotFounderror();
  }
  return alumnoRepo.update(alumno);
}

async function deleteOne(id: number): Promise<void> {
  const persists = await alumnoRepo.persists(id);
  if (!persists) {
    throw new AlumnoNotFounderror();
  }
  return alumnoRepo.deleteOne(id);
}

export default { getAll, getOne, addOne, updateOne, deleteOne } as const;