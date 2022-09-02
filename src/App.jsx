import { useEffect } from 'react'
import './App.css'
import { init, toneFunc, stopFunc, changeVol, volArray } from './soundEngine'
import api from './api'

const App = () => {

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.call({ from: '2022-07-31 05:00:00', to: '2022-07-31 05:59:59' })
			const data = await response.json()
			console.log(data)
		}
		fetchData()
	}, [])

	return (
		<>
			<h1>Sonic Weather Station</h1>
			<button type="button" onClick={init}>init</button>
			<button type="button" onClick={toneFunc}>Soundon!</button>
			<button type="button" onClick={stopFunc}>Stop!</button>
			{
				volArray.map(
					(target, index) => (
						<input
							key={index}
							type="range"
							min="-60"
							max="0"
							onChange={(event) => changeVol(target, event.target.value)}
						/>
					)
				)
			}
		</>

	)
}

export default App
