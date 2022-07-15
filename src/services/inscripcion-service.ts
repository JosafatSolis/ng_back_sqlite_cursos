import inscripcionRepo from "@repos/inscripcion-repo";
import { InscripcionItem } from "@models/inscripcion-item";
import { InscripcionNotFoundError } from "@shared/errors";
import cursoService from "./curso-service";
import alumnoService from "./alumno-service";
import { AlumnoItem } from "@models/alumno-item";
import { CursoItem } from '../models/curso-item';
import usuarioService from "./usuario-service";
import { UsuarioItem } from '../models/usuario-item';

async function getAll(alumno_id?: string, curso_id ?: string): Promise<InscripcionItem[]> {
  let inscripciones_dto = await inscripcionRepo.getAll(alumno_id, curso_id);
  // For each inscription, get data from alumno, curso, usuario and inscritoPor, then adds to array
  let inscripciones : InscripcionItem[] = [];
  for(const i_dto of inscripciones_dto) {
    let alumno = await alumnoService.getOne(i_dto.alumno);
    let curso = await cursoService.getOne(i_dto.curso);
    let usuario = await usuarioService.getOne(i_dto.inscritoPor);
    let nvo: InscripcionItem = {
      id: i_dto.id,
      alumno: alumno as AlumnoItem,
      curso: curso as CursoItem,
      fechaInscripcion: new Date(i_dto.fechaInscripcion),
      fechaBorrado: i_dto.fechaBorrado ? new Date(i_dto.fechaBorrado) : null,
      inscritoPor: usuario as UsuarioItem,
      borradoPor: i_dto.borradoPor ? await usuarioService.getOne(i_dto.borradoPor) : null
    };
    console.log(nvo);
    inscripciones.push(nvo)
  }
  console.log(inscripciones);
  // Return a Promise
  return Promise.resolve(inscripciones);
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