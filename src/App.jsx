import './App.css'
import { init, toneFunc, stopFunc, changeVol, volArray,triggerRamps, handleMouseMove } from './soundEngine'
import Dots from './Dots'

const App = () => {

	return (
		<>
			<h1>Sonic Weather Station</h1>
			<button type="button" onClick={init}>init</button>
			<button type="button" onClick={toneFunc}>Soundon!</button>
			<button type="button" onClick={stopFunc}>Stop!</button>
			<button type="button" onClick={triggerRamps}>TriggerRamps!</button>
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
			<Dots onChange={handleMouseMove} />
		</>

	)
}

export default App
