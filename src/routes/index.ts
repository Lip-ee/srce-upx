import { Request, Response, Router } from 'express'
import AuthRoutes from '../modules/auth/auth.routes'
import * as mongoose from 'mongoose'
import 'dotenv/config'

const router = Router()

/*

querido guts, pai não sabia onde encaixar as rotas
então acabei deixando aqui mesmo.

se tiver um local específico, fique a vontade para me
ensinar, ou apenas mudar e me avisar depois :)

API - SRCE

*/

// DATABASE CONFIGS
mongoose.connect(`mongodb+srv://lipope:${process.env.MONGODB_PASSWORD}@srce-db.9vjnuey.mongodb.net/?retryWrites=true&w=majority`)

const contaSchema = new mongoose.Schema({
	contaID: { type: String }, // obs: pra não dar erro, botei tudo como string
	dataPag: { type: String },
	nomeTitular: { type: String },
	valorPag: { type: String },
	infoPag: { type: String },
	numeroMedidor: { type: String },
	locLatitude: { type: String },
	locLongitude: { type: String },
})

const Conta = mongoose.model('Conta', contaSchema)


// GET - PING PONG (just testing)
router.get('/ping', (req: Request, res: Response) => {
	return res.status(200).json({
		name: 'UPX API',
		version: process.env.npm_package_version,
		env: process.env.ENVIRONMENT,
		message: 'yeah buddy! its working!'
	})
	
})

// GET - LISTAR CONTAS
router.get('/listar_contas', async (req: Request, res: Response) => {
	const contas = await Conta.find()
	return res.status(200).json(contas)
})

// GET - LISTA CONTA POR ID
router.get('/listar_conta/:id', async (req: Request, res: Response) => {
	const conta = await Conta.findById(req.params.id)
	return res.status(200).json(conta)
})

// POST - NOVA CONTA
router.post('/nova_conta/', async (req: Request, res: Response) => {
	const conta = new Conta({
		contaID: req.body.contaID,
		dataPag: req.body.dataPag,
		nomeTitular: req.body.nomeTitular,
		valorPag: req.body.valorPag,
		infoPag: req.body.infoPag,
		numeroMedidor: req.body.numeroMedidor,
		locLatitude: req.body.locLatitude,
		locLongitude: req.body.locLongitude,
	})

	await conta.save()
	return res.send(conta)
})

// PUT - ATUALIZAR CONTA
router.put('/atualizar_conta/:id', async (req: Request, res: Response) => {
	const conta = await Conta.findByIdAndUpdate(req.params.id, {
		contaID: req.body.contaID,
		dataPag: req.body.dataPag,
		nomeTitular: req.body.nomeTitular,
		valorPag: req.body.valorPag,
		infoPag: req.body.infoPag,
		numeroMedidor: req.body.numeroMedidor,
		locLatitude: req.body.locLatitude,
		locLongitude: req.body.locLongitude,
	}, { new: true })

	return res.send(conta)
})

// DELETE - APAGAR CONTA
router.delete('/apagar_conta/:id', async (req: Request, res: Response) => {
	const conta = await Conta.findByIdAndDelete(req.params.id)
	return res.send(conta)
})

router.use('/', AuthRoutes)

export default router