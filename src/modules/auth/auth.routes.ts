import { Request, Response, Router } from 'express'
import {
  LoginSchema
} from './auth.schema'
import Validation from '../../middlewares/Validation'
import AuthController from './auth.controller'

const routes = Router()
const validation = new Validation()
const authController = new AuthController()

routes.post(
  '/auth/login',
  validation.validate(LoginSchema),
  (req: Request, res: Response) => authController.login(req, res),
)

routes.post(
  '/auth/signUp',
  validation.validate(LoginSchema),
  (req: Request, res: Response) => authController.signUp(req, res),
)

export default routes