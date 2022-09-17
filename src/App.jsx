import './App.css'
import { handleMouseMove, handleMouseClick, start } from './soundEngine'
import Dots from './Dots'
import DataDisplay from './DataDisplay'
import Start from './Start'
import { useState } from 'react'

const App = () => {

	const [started, setStarted] = useState(false)

	const handleStart = () => {
		setStarted(true)
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
			<DataDisplay />
			<Dots onChange={handleMouseMove} onClick={handleMouseClick} />
		</>

	)
}

export default App
