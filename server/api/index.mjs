import accurateInterval from 'accurate-interval'
import { interval } from '../../common/constants.js'
import { minToMs } from '../../common/helpers.js'
import { getTimeToNextFetch } from './caching.mjs'
import { fetchData } from './fetching.mjs'

let cachedResponse

const fetchAndCache = async () => {
	cachedResponse = await fetchData({ dummy: false })
	console.log('Storing data', cachedResponse)
}

setTimeout(() => {
	accurateInterval(fetchAndCache, minToMs(interval), { immediate: true })
}, getTimeToNextFetch())

fetchAndCache()

const fetchCurrent = () => {
	return cachedResponse
}

export { fetchCurrent }
