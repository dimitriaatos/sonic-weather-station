import './App.css'

import {
	handleMouseMove,
	handleMouseClick,
	start,
	players,
	audioFilePaths,
} from './soundEngine'

import Dots from './Dots'
import DataDisplay from './DataDisplay'
import Start from './Start'
import { useRef, useState, useEffect } from 'react'
import api from './api'

const App = () => {
	const [started, setStarted] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const loadingPromise = useRef()

	useEffect(() => {
		const filesLoading = Object.entries(players).map(([key, player]) =>
			player.load(audioFilePaths[key])
		)
		loadingPromise.current = Promise.all([...filesLoading, api.loadCurrent()])
	}, [])

	const handleStart = async () => {
		setStarted(true)
		await loadingPromise.current
		setLoaded(true)
		start()
	}

	return (
		<>
			{started || <Start onClick={handleStart} />}
			<h1>Sonic Weather Station</h1>
			{/* {
				volArray.map(
					(target, index) => (
						<input
							key={index}
							type="range"
							min="-60"
							max="0"
							onChange={(event) => target.volume.value = event.target.value}
						/>
					)
				)
			} */}
			{loaded || <h3>Loading</h3>}
			<DataDisplay />
			<Dots onChange={handleMouseMove} onClick={handleMouseClick} />
		</>
	)
}

export default App
