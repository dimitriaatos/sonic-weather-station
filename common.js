const port = 3000

const minToMs = (min) => min * 60 * 1000

const poll = minToMs(10)

const dummyWindData = [
	{
		data: {
			wind: 0.959,
		},
		timeStamp: 1662961200000,
	},
	{
		data: {
			wind: 0.883,
		},
		timeStamp: 1662960600000,
	},
]

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

const combineApiResponses = (responses) =>
	responses.reduce(
		(combined, apiResp) => {
			return combined.map((resp, index) => {
				return {
					timeStamp: apiResp[index].timeStamp,
					data: { ...resp.data, ...apiResp[index].data },
				}
			})
		},
		[{}, {}]
	)

const combinedDummyData = combineApiResponses([dummyData, dummyWindData])

export {
	port,
	poll,
	dummyData,
	dummyWindData,
	combineApiResponses,
	combinedDummyData,
}
