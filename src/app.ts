import express, { json, Request, Response, urlencoded } from 'express'

import cors from 'cors'
import routes from './routes'
import 'dotenv/config'

const app = express()

app.use(cors({ origin: '*' }))
app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true }))

app.use('/', routes)

export default app