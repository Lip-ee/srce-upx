import express, { json, Request, Response, urlencoded } from 'express'
import * as mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import 'dotenv/config'

const app = express()

app.use(cors({ origin: '*' }))
app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

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

/*

querido guts, pai não sabia onde encaixar as requisições
então acabei fazendo aqui mesmo.

se tiver um local específico, fique a vontade para me
ensinar, ou apenas mudar e me avisar depois :)

API - SRCE

*/

// GET - PING PONG (just testing)
app.get('/ping', (req: Request, res: Response) => {
	return res.status(200).json({
		name: 'UPX API',
		version: process.env.npm_package_version,
		env: process.env.ENVIRONMENT,
		message: 'yeah buddy! its working!'
	})
	
})

// GET - LISTAR CONTAS
app.get('/listar_contas', async (req: Request, res: Response) => {
	const contas = await Conta.find()
	return res.status(200).json(contas)
})

// POST - NOVA CONTA
app.post('/nova_conta/', async (req: Request, res: Response) => {
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

// DELETE - APAGAR CONTA
app.delete('/apagar_conta/:id', async (req: Request, res: Response) => {
	const conta = await Conta.findByIdAndDelete(req.params.id)
	return res.send(conta)
})

app.use('/', routes)

export default app