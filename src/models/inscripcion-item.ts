import { AlumnoItem } from "./alumno-item";
import { CursoItem } from "./curso-item";
import { UsuarioItem } from "./usuario-item";

export interface InscripcionItem {
    id: number;
    alumno: AlumnoItem;
    curso: CursoItem;
    fechaInscripcion: Date;
    fechaBorrado: Date | null;
    inscritoPor: UsuarioItem;
    borradoPor: UsuarioItem | null;
}