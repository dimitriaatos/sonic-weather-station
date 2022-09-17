import { poll } from '../common'

const api = {}

api.call = async (params = {}) => {
	const url = new URL(`${origin}/api`)
	url.search = new URLSearchParams(params).toString()
	const response = await fetch(url, {
		mode: 'cors',
	})
	return await response.json()
}

api.getCurrent = async () => await api.call()

api.loadCurrent = async () => {
	const data = await api.getCurrent()
	api.loaded = data
}

const callbackWrapper = (callback) => async () => {
	let current, prev
	if (api.loaded) {
		;[current, prev] = api.loaded
		api.loaded = undefined
	} else {
		;[current, prev] = await api.getCurrent()
	}
	callback(current, prev, poll)
}

api.update = (callback) => {
	callbackWrapper(callback)()
	setInterval(callbackWrapper(callback), poll)
}

export default api
