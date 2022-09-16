const port = 3000

const minToMs = (min) => min * 60 * 1000

const poll = minToMs(10)

const dummyData = [
	{
		data: {
			rain: 0,
			barometer: 1010.653,
			relativeHumidity: 44.439,
			airTemp: 24.705,
		},
		timeStamp: 1662961200000,
	},
	{
		data: {
			rain: 0,
			barometer: 1010.733,
			relativeHumidity: 44.71,
			airTemp: 24.735,
		},
		timeStamp: 1662960600000,
	},
]

export { port, poll, dummyData }
