import accurateInterval from 'accurate-interval'
import { interval } from '../../common/constants.js'
import { minToMs } from '../../common/helpers.js'
import { getFetchOptions, getTimeToNextFetch } from './caching.mjs'
import { getBoth } from './fetching.mjs'

let cachedResponse

const fetchAndCache = async () => {
	cachedResponse = await getBoth(getFetchOptions())
}

getTimeToNextFetch()

setTimeout(() => {
	accurateInterval(fetchAndCache, minToMs(interval), { immediate: true })
}, getTimeToNextFetch())

fetchAndCache()

const fetchCurrent = () => {
	return cachedResponse
}

export { fetchCurrent }
