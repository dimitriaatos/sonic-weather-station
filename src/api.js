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

const callbackWrapper = (callback) => async () => {
	const [data, prevData] = await api.getCurrent()
	callback(data, prevData, poll)
}

api.update = (callback) => {
	callbackWrapper(callback)()
	setInterval(callbackWrapper(callback), poll)
}

export default api
