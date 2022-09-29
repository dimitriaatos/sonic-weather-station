export default {
	airTemp: {
		title: 'Temperature',
		unit: '°C',
		dimension: 'bottomLeft',
		randomRange: 0.5,
	},
	relativeHumidity: {
		title: 'Humidity',
		unit: '%',
		dimension: 'upperLeft',
		randomRange: 0.5,
	},
	barometer: {
		title: 'Barometer',
		unit: 'mbar',
		dimension: 'upperRight',
		randomRange: 0.5,
	},
	wind: {
		title: 'Wind',
		unit: 'km/h',
		dimension: 'bottomRight',
		randomRange: 0.02,
	},
	rain: {
		title: 'Rain',
		unit: 'mm',
		dimension: false,
		randomRange: 0,
	},
}
