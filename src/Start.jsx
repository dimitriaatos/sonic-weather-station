import { useState } from 'react'
import { toneFunc } from './soundEngine'
import './Start.css'

const App = () => {
	const [started, setStarted] = useState(false)

	const handleStart = () => {
		setStarted(true)
		toneFunc()
	}

	return (
		<>
			{!started && (<div className='start'>
				<h1>Sonic Weather Station</h1>
				<button type="button" onClick={handleStart}>Start</button>
			</div>)
			}
		</>

	)
}

export default App
