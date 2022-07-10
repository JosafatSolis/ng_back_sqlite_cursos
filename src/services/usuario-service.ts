import usuarioRepo from "@repos/usuario-repo";
import { UsuarioItem } from "@models/usuario-item";
import { UsuarioNotFoundError } from "@shared/errors";

function getAll(): Promise<UsuarioItem[]> {
  return usuarioRepo.getAll();
}

function getOne(id: number): Promise<UsuarioItem | null> {
  return usuarioRepo.getOne(id);
}

function addOne(usuario: UsuarioItem): Promise<void> {
  return usuarioRepo.add(usuario);
}

async function updateOne(usuario: UsuarioItem): Promise<void> {
  const persists = await usuarioRepo.persists(usuario.id);
  if (!persists) {
    throw new UsuarioNotFoundError();
  }
  return usuarioRepo.update(usuario);
}

async function deleteOne(id: number): Promise<void> {
  const persists = await usuarioRepo.persists(id);
  if (!persists) {
    throw new UsuarioNotFoundError();
  }
  return usuarioRepo.deleteOne(id);
}

export default { getAll, getOne, addOne, updateOne, deleteOne } as const;