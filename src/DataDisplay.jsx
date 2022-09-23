import { useEffect, useState } from 'react'
import { dataSignals } from './soundEngine'
import './DataDisplay.css'
import dataMap from './dataMap'

const Data = ({ dimensions }) => {
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
					Object.entries(dataSignals).map(([key, { signal, noise }]) => [
						key,
						(signal.value + noise.value).toFixed(2),
					])
				)
			)
		}, 500)
	}, [])

	return (
		<div className="data">
			{Object.entries(liveData).map(([key, value], index) => (
				<div
					className="datum"
					key={index}
					style={{ opacity: dimensions[dataMap[key].dimension] }}
				>
					<div className="value">
						{value} {dataMap[key].unit}
					</div>
					<div className="name">{dataMap[key].title}</div>
				</div>
			))}
		</div>
	)
}

export default Data
