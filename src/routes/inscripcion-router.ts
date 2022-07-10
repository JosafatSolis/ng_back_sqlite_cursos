import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from "express";

import inscripcionService from "@services/inscripcion-service";
import { ParamMissingError } from "@shared/errors";

const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: "/all",
    get_one: "/:id",
    add: "/add",
    update: "/update",
    delete: "/:id",
} as const;

// Get all inscripciones.
router.get(p.get, async (req: Request, res: Response) => {
    let { alumno } = req.query;
    let { curso } = req.query;
    const inscripciones = await inscripcionService.getAll(alumno as string | undefined, curso as string | undefined);
    return res.status(OK).json({ inscripciones });
});

// Get one inscripcion.
router.get(p.get_one, async (req: Request, res: Response) => {
    const inscripcion = await inscripcionService.getOne(+req.params.id);
    return res.status(OK).json({ inscripcion });
});

// Add one inscripcion.
router.post(p.add, async (req: Request, res: Response) => {
    const { inscripcion } = req.body;
    // Check param
    if (!inscripcion) {
        throw new ParamMissingError();
    }
    // Fetch data
    await inscripcionService.addOne(inscripcion);
    return res.status(CREATED).end();
});

// Update one inscripcion.
router.put(p.update, async (req: Request, res: Response) => {
    const { inscripcion } = req.body;
    // Check param
    if (!inscripcion) {
        throw new ParamMissingError();
    }
    // Fetch data
    await inscripcionService.updateOne(inscripcion);
    return res.status(OK).end();
});

// Delete one inscripcion.
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await inscripcionService.deleteOne(+id);
    return res.status(OK).end();
});

export default router;