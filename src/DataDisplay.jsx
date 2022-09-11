import { useEffect, useState } from 'react'
import { dataSignals } from './soundEngine'
import './DataDisplay.css'
import { compose } from 'ramda'

const names = {
	airTemp: {
		title: 'Temperature',
		unit: '°C'
	},
	relativeHumidity: {
		title: 'Humidity',
		unit: '%'
	},
	rain: {
		title: 'Rain',
		unit: 'mm'
	},
	barometer: { title: 'Barometer', unit: 'mbar' }
}

const Data = () => {

	const [liveData, setLiveData] = useState({
		airTemp: 0,
		relativeHumidity: 0,
		rain: 0,
		barometer: 0,
	})


	useEffect(() => {
		setInterval(() => {
			setLiveData(
				Object.fromEntries(
					Object.entries(dataSignals).map(([key, sig]) => [key, sig.value.toFixed(2)])
				)
			)
		}, 500)
	}, [])

	return (
		<div className='data'>
			{
				Object.entries(liveData).map(([key, value], index) => (
					<div className='datum' key={index}>
						<div className='value'>{value} {names[key].unit}</div>
						<div className='name'>{names[key].title}</div>
					</div>
				))
			}
		</div>

	)
}

export default Data
