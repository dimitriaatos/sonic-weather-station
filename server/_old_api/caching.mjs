import { getQueryDateFormat, objectMap } from '../utils.mjs'
import { interval, backendOffset } from '../../common/constants.js'
import { minToMs } from '../../common/helpers.js'

const getLastSamplingTime = (now = new Date(), offset) => {
	const date = new Date(now)
	const sampleMinutes = Math.floor(date.getMinutes() / 10) * 10
	date.setMinutes(sampleMinutes)
	date.setSeconds(0)
	date.setMilliseconds(0)

	if (now.getTime() - date.getTime() < minToMs(offset)) {
		date.setMinutes(date.getMinutes() - interval)
	}

	return date
}

const getTimeToNextFetch = (now = new Date()) => {
	const nextSampleTime = new Date(now)
	nextSampleTime.setMinutes(
		getLastSamplingTime(now).getMinutes() + interval + backendOffset
	)
	return nextSampleTime.getTime() - now.getTime()
}

const getFetchOptions = (now = new Date()) => {
	const to = getLastSamplingTime(now)
	const from = new Date(to)
	from.setMinutes(to.getMinutes() - interval)
	return objectMap({ to, from }, ([key, value]) => [
		key,
		getQueryDateFormat(value),
	])
}

export { getTimeToNextFetch, getFetchOptions }
