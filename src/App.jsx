import './App.css'
import { init, toneFunc, stopFunc, changeVol, volArray } from './soundEngine'

const App = () => {

	return (
		<div>
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
		</div>

	)
}

export default App
