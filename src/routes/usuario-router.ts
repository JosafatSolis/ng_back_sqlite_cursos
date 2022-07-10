import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from "express";

import usuarioService from "@services/usuario-service";
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

// Get all users.
router.get(p.get, async (_: Request, res: Response) => {
  const usuarios = await usuarioService.getAll();
  return res.status(OK).json({ usuarios });
});

// Get one user.
router.get(p.get_one, async (req: Request, res: Response) => {
  const usuario = await usuarioService.getOne(+req.params.id);
  return res.status(OK).json({ usuario });
});


// Add one user.
router.post(p.add, async (req: Request, res: Response) => {
  const { usuario } = req.body;
  // Check param
  if (!usuario) {
    throw new ParamMissingError();
  }
  // Fetch data
  await usuarioService.addOne(usuario);
  return res.status(CREATED).end();
});

// Update one user.
router.put(p.update, async (req: Request, res: Response) => {
  const { usuario } = req.body;
  // Check param
  if (!usuario) {
    throw new ParamMissingError();
  }
  // Fetch data
  await usuarioService.updateOne(usuario);
  return res.status(OK).end();
});

// Delete one user.
router.delete(p.delete, async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }
  // Fetch data
  await usuarioService.deleteOne(+id);
  return res.status(OK).end();
});

export default router;