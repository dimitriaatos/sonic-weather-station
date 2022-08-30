import './App.css'
import {init, toneFunc, stopFunc} from './soundEngine'

const App = () => {

	return (
		<div>
			<h1>Sonic Weather Station</h1>
			<button type="button" onClick={init}>init</button>
			<button type="button" onClick={toneFunc}>Soundon!</button>
			<button type="button" onClick={stopFunc}>Stop!</button>
		</div>

	)
}

export default App
