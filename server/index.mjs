import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { fetchCurrent } from './api/index.mjs'
import { port as defaultPort } from '../common/constants.js'

const app = express()
const port = process.env.SERVER_PORT || defaultPort

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
	const response = await fetchCurrent({ dummy: false })
	res.json(response)
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
