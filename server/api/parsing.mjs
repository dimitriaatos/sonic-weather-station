const keyMap = [
	false,
	false,
	false,
	'barometer',
	'airTemp',
	'relativeHumidity',
	'rain',
	false,
	'wind',
]

const dateKeys = [false, 'date', 'time']

const parseTime = (timeString) => {
	while (timeString.length < 4) {
		timeString = '0' + timeString
	}
	return [
		[0, 2],
		[2, 4],
	].map((indexes) => parseInt(timeString.substring(...indexes)))
}

// const weekLines = 6 * 2 * 24 * 8

const parseResults = (text) => {
	let subset = text.split('\n')
	const { length } = subset
	subset.slice(length - 5, length - 1)
	return subset
		.map((line) => {
			const date = new Date()
			date.setMonth(0, 0)
			date.setHours(0, 0, 0, 0)

			const data = line.split(',').reduce((data, value, index) => {
				const key = keyMap[index]
				const dateKey = dateKeys[index]
				if (dateKey == 'date') {
					date.setDate(parseInt(value))
				}
				if (dateKey == 'time') {
					date.setHours(...parseTime(value))
				}
				if (key) data[key] = parseFloat(value)
				return data
			}, {})

			return { data, timeStamp: date.getTime() }
		})
		.filter((element, index) => index == 0 || index == 2)
}

export { parseResults }
