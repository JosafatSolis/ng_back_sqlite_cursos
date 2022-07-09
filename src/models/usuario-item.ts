export interface UsuarioItem {
    id: number,
    username: string,
    nombre: string,
    pwd: string
    alumnosCUD: boolean,
    cursosCUD: boolean,
    inscripcionesCUD: boolean,
    usuariosCUD: boolean
}