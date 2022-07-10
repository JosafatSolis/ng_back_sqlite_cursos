import exp from 'constants';
import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}


export class ParamMissingError extends CustomError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}


export class UserNotFoundError extends CustomError {

    public static readonly Msg = 'A user with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
    }
}

export class CursoNotFoundError extends CustomError {

    public static readonly Msg = 'A curso with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(CursoNotFoundError.Msg, CursoNotFoundError.HttpStatus);
    }
}

export class UsuarioNotFoundError extends CustomError {

    public static readonly Msg = 'A usuario with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(UsuarioNotFoundError.Msg, UsuarioNotFoundError.HttpStatus);
    }
}

export class InscripcionNotFoundError extends CustomError {

    public static readonly Msg = 'A inscripcion with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(InscripcionNotFoundError.Msg, InscripcionNotFoundError.HttpStatus);
    }
}

export class AlumnoNotFounderror extends CustomError {

    public static readonly Msg = 'A alumno with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(AlumnoNotFounderror.Msg, AlumnoNotFounderror.HttpStatus);
    }
}