import { parseResults } from './parsing.mjs'
import dummyData from '../../common/dummyData.js'
import fetch from 'node-fetch'
import https from 'https'

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
})

const url = 'https://meteo3.geo.auth.gr/stations/CR10_final_storage_1.dat'

const fetchData = async ({ dummy = false }) => {
	if (dummy) {
		return dummyData
	} else {
		try {
			console.log('Fetching live data')
			const response = await fetch(url, {
				agent: httpsAgent,
			})
			const text = await response.text()
			return parseResults(text)
		} catch (error) {
			console.log(error)
			return dummyData
		}
	}
}

export { fetchData }
