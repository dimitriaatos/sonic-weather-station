import express from 'express'
import { fetchCurrent } from './api/index.mjs'
import { port } from '../common/constants.js'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
	const response = await fetchCurrent({ dummy: false })
	res.json(response)
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
