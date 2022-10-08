import './App.css'

import {
	handleVolumes,
	handleMouseClick,
	start,
	players,
	audioFilePaths,
} from './soundEngine'

import Dots from './Dots'
import DataDisplay from './DataDisplay'
import Start from './Start'
import { useRef, useState, useEffect } from 'react'
import * as api from './api'
import { calcDistanceFromCorners } from './helpers'
import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

const App = () => {
	const [started, setStarted] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [dimensions, setDimensions] = useState(false)
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
		noSleep.enable()
	}

	const handleMouseMove = (mouseCoords) => {
		const dimensions = calcDistanceFromCorners(mouseCoords)
		setDimensions(dimensions)
		handleVolumes(dimensions)
	}

	return (
		<>
			{started || <Start onClick={handleStart} />}
			{loaded || <h3>Loading</h3>}
			<DataDisplay dimensions={dimensions} />
			<Dots onChange={handleMouseMove} onClick={handleMouseClick} />
			<div className="footer-info">
				Sonic Weather Station | Thessaloniki | Greece | 40.631001, 22.958266
			</div>
		</>
	)
}

export default App
