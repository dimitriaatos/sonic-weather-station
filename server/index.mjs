import express from 'express'
import api from './api.mjs'
import { port } from '../common.js'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
	const response = await api.getCurrent({ dummy: false })
	res.json(response)
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
