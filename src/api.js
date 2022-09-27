import accurateInterval from 'accurate-interval'
import { interval } from '../common/constants'
import { minToMs } from '../common/helpers'

let loaded

const call = async (params = {}) => {
	const url = new URL(`${origin}/api`)
	url.search = new URLSearchParams(params).toString()
	const response = await fetch(url, {
		mode: 'cors',
	})
	return await response.json()
}

const getCurrent = async () => await call()

const loadCurrent = async () => {
	const data = await getCurrent()
	loaded = data
}

const callbackWrapper = (callback) => async () => {
	let current, prev
	if (loaded) {
		;[current, prev] = loaded
		loaded = undefined
	} else {
		;[current, prev] = await getCurrent()
	}
	callback(current, prev, interval)
}

const update = (callback) => {
	accurateInterval(callbackWrapper(callback), minToMs(interval), {
		immediate: true,
	})
}

export { update, loadCurrent }
