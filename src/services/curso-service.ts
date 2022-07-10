import cursoRepo from "@repos/curso-repo";
import { CursoItem } from "@models/curso-item";
import { CursoNotFoundError } from "@shared/errors";

function getAll(): Promise<CursoItem[]> {
  return cursoRepo.getAll();
}

function getOne(id: number): Promise<CursoItem | null> {
  return cursoRepo.getOne(id);
}

function addOne(curso: CursoItem): Promise<void> {
  return cursoRepo.add(curso);
}

async function updateOne(curso: CursoItem): Promise<void> {
  const persists = await cursoRepo.persists(curso.id);
  if (!persists) {
    throw new CursoNotFoundError();
  }
  return cursoRepo.update(curso);
}

async function deleteOne(id: number): Promise<void> {
  const persists = await cursoRepo.persists(id);
  if (!persists) {
    throw new CursoNotFoundError();
  }
  return cursoRepo.deleteOne(id);
}

export default { getAll, getOne, addOne, updateOne, deleteOne } as const;
