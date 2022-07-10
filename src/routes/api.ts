import { Router } from 'express';
import cursoRouter from './curso-router';
import usuarioRouter from './usuario-router';
import alumnoRouter from './alumno-router';
import inscripcionRouter from './inscripcion-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/cursos', cursoRouter);
baseRouter.use('/usuarios', usuarioRouter);
baseRouter.use('/alumnos', alumnoRouter);
baseRouter.use('/inscripciones', inscripcionRouter);

// Export default.
export default baseRouter;
