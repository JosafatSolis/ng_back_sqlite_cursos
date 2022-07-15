export interface InscripcionDTO {
    id: number;
    alumno: number;
    curso: number;
    fechaInscripcion: string;
    fechaBorrado: string | null;
    inscritoPor: number;
    borradoPor: number | null;
}