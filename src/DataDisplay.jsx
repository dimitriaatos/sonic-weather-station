import { useEffect, useState } from 'react'
import { dataSignals } from './soundEngine'
import './DataDisplay.css'
import dataMap from './dataMap'
import { scale } from './helpers'

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
			{Object.entries(liveData).map(([key, value], index) => {
				const dimension = dimensions[dataMap[key].dimension] || 0.5
				return (
					<div
						className="datum"
						key={index}
						style={{
							opacity: scale(dimension, 0, 1, 0.5, 1),
						}}
					>
						<div
							className="value"
							style={{ fontSize: scale(dimension, 0, 1, 15, 20) }}
						>
							{value} {dataMap[key].unit}
						</div>
						<div
							className="name"
							style={{ fontSize: scale(dimension, 0, 1, 12, 16) }}
						>
							{dataMap[key].title}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Data
