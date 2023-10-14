import { Router } from 'express'
import TesteRoutes from '../modules/teste/teste.routes'

const router = Router()

router.use('/', TesteRoutes)

export default router