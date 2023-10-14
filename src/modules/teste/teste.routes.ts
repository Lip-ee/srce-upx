import { Request, Response, Router } from "express";
import TesteController from "./teste.controller";

const testeController = new TesteController()

const routes = Router()

routes.get(
	'/teste',
	(req: Request, res: Response) => testeController.teste(req, res),
)

export default routes