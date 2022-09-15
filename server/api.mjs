import fetch from 'node-fetch'
import { xml2json } from 'xml-js'
import { compose } from 'ramda'
import { toCamel } from './utils.mjs'
import { poll } from '../common.js'
import dummyData from './dummyData.mjs'

const url =
	'https://www.symmetron.gr/captum/xml_results.php?search_str=' +
	['babzel', 'auth2018', '043E0295', 1111].join('|')

const keyMap = {
	rh: 'relativeHumidity',
	airTemp: true,
	barometer: true,
	rain: true,
}

const mapKeys = (key) => {
	key = toCamel(key)
	key = keyMap[key] === true ? key : keyMap[key]
	return key
}

const parseResults = (data) => {
	console.log(data)
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

const call = async (params) => {
	const response = await fetch(`${url}|${params.from}|${params.to}`)
	const text = await response.text()
	const json = xml2json(text, {
		compact: true,
		nativeType: true,
		nativeTypeAttributes: true,
		textKey: 'text',
	})
	const parsed = compose(parseResults, JSON.parse)(json)
	return parsed
}

const getQueryDateFormat = (date) => {
	const isoString = date.toISOString()
	return `${isoString.substring(0, 10)} ${isoString.substring(11, 19)}`
}

const getCurrent = async ({ dummy }) => {
	if (dummy) {
		return dummyData
	} else {		
		const to = new Date()
		const from = new Date(to.getTime() - poll * 3)
		return await call({
			from: getQueryDateFormat(from),
			to: getQueryDateFormat(to),
		})
	}
}
export default {
	url,
	call,
	getCurrent,
}
