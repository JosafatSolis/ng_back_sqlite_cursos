import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from "express";

import alumnoService from "@services/alumno-service";
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

// Get all alumnos.
router.get(p.get, async (_: Request, res: Response) => {
    const alumnos = await alumnoService.getAll(true);
    return res.status(OK).json({ alumnos });
});

// Get one alumno.
router.get(p.get_one, async (req: Request, res: Response) => {
    const alumno = await alumnoService.getOne(+req.params.id, true);
    return res.status(OK).json({ alumno });
});

// Add one alumno.
router.post(p.add, async (req: Request, res: Response) => {
    const { alumno } = req.body;
    // Check param
    if (!alumno) {
        throw new ParamMissingError();
    }
    // Fetch data
    await alumnoService.addOne(alumno);
    return res.status(CREATED).end();
});

// Update one alumno.
router.put(p.update, async (req: Request, res: Response) => {
    const { alumno } = req.body;
    // Check param
    if (!alumno) {
        throw new ParamMissingError();
    }
    // Fetch data
    await alumnoService.updateOne(alumno);
    return res.status(OK).end();
});

// Delete one alumno.
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await alumnoService.deleteOne(+id);
    return res.status(OK).end();
});

export default router;