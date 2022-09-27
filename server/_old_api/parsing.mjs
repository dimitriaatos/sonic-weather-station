import { toCamel } from '../utils.mjs'

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

export { parseResults }
