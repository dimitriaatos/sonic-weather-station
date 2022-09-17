import './Start.css'

const App = ({ onClick }) => {
	return (
		<div className="start">
			<h1>Sonic Weather Station</h1>
			<button type="button" onClick={onClick}>
				Start
			</button>
		</div>
	)
}

export default App
