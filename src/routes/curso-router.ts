import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import cursoService from '@services/curso-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    get_one: '/:id',
    add: '/add',
    update: '/update',
    delete: '/:id',
} as const;

// Get all courses.
router.get(p.get, async (_: Request, res: Response) => {
    const courses = await cursoService.getAll();
    return res.status(OK).json({ courses });
});

// Get one course.
router.get(p.get_one, async (req: Request, res: Response) => {
    const course = await cursoService.getOne(+req.params.id);
    return res.status(OK).json({ course });
});

// Add one course.
router.post(p.add, async (req: Request, res: Response) => {
    const { course } = req.body;
    // Check param
    if (!course) {
        throw new ParamMissingError();
    }
    // Fetch data
    await cursoService.addOne(course);
    return res.status(CREATED).end();
});

// Update one course.
router.put(p.update, async (req: Request, res: Response) => {
    const { course } = req.body;
    // Check param
    if (!course) {
        throw new ParamMissingError();
    }
    // Fetch data
    await cursoService.updateOne(course);
    return res.status(OK).end();
});

// Delete one course.
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await cursoService.deleteOne(+id);
    return res.status(OK).end();
});

export default router;