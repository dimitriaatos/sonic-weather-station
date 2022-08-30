import './App.css'

const App = () => {

	return (
		<div>
			<h1>Sonic Weather Station</h1>
			<button type="button">init</button>
			<button type="button" onclick="toneFunc()">Soundon!</button>
			<button type="button" onclick="stopFunc()">Stop!</button>
		</div>

	)
}

export default App
