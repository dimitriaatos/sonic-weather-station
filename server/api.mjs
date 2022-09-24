import fetch from 'node-fetch'
import { xml2json } from 'xml-js'
import { compose } from 'ramda'
import { toCamel } from './utils.mjs'
import { poll, dummyData, combineApiResponses } from '../common.js'
import { AbortController } from 'node-abort-controller'

const apiKeys = { general: '049E0513', wind: '043E0295' }

const getUrl = (key) =>
	'https://www.symmetron.gr/captum/xml_results.php?search_str=' +
	['babzel', 'auth2018', key, 1111].join('|')

const URLs = {
	general: getUrl(apiKeys.general),
	wind: getUrl(apiKeys.wind),
}

const keyMap = {
	rh: 'relativeHumidity',
	airTemp: true,
	barometer: true,
	rain: true,
	wspeed: 'wind',
}

const mapKeys = (key) => {
	key = toCamel(key)
	key = keyMap[key] === true ? key : keyMap[key]
	return key
}

const parseResults = (data) => {
	return data.results.channels.channel
		.reduce((results, channel) => {
			const timeStamp = new Date(channel.datetime.text).getTime()
			let index = results.findIndex((element) => element.timeStamp == timeStamp)
			if (index < 0) {
				index =
					results.push({
						data: {},
						timeStamp,
					}) - 1
			}
			const parsedKey = mapKeys(channel.description.text)
			if (parsedKey) results[index].data[parsedKey] = channel.value.text
			return results
		}, [])
		.sort((a, b) => b.timeStamp - a.timeStamp)
}

const call = async (params, name) => {
	const fetchController = new AbortController()
	const { signal } = fetchController
	let parsed

	const abortTimeout = setTimeout(() => {
		fetchController.abort()
		console.log('aborting weather data fetching, using dummy data')
	}, 10000)

	try {
		const response = await fetch(`${URLs[name]}|${params.from}|${params.to}`, {
			signal,
		})
		clearTimeout(abortTimeout)
		const text = await response.text()
		const json = xml2json(text, {
			compact: true,
			nativeType: true,
			nativeTypeAttributes: true,
			textKey: 'text',
		})
		parsed = compose(parseResults, JSON.parse)(json)
	} catch (error) {
		parsed = dummyData[name]
	}

	return parsed
}

const getQueryDateFormat = (date) => {
	const isoString = date.toISOString()
	return `${isoString.substring(0, 10)} ${isoString.substring(11, 19)}`
}

const getCurrent = async ({ dummy, name = 'general' }) => {
	if (dummy) {
		return dummyData[name]
	} else {
		const to = new Date()
		const from = new Date(to.getTime() - poll * 3)

		let response

		try {
			response = await call(
				{
					from: getQueryDateFormat(from),
					to: getQueryDateFormat(to),
				},
				name
			)
		} catch (error) {
			response = dummyData[name]
		}

		return response
	}
}

const getBoth = async (options = {}) => {
	const requests = Object.keys(URLs).map((name) =>
		getCurrent({ ...options, name })
	)
	const responses = await Promise.all(requests)

	const combinedResponses = combineApiResponses(responses)
	return combinedResponses
}

export default {
	getBoth,
	call,
	getCurrent,
}
