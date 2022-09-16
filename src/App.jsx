import './App.css'
import { init, toneFunc, stopFunc, changeVol, volArray, triggerRamps, handleMouseMove, handleMouseClick } from './soundEngine'
import Dots from './Dots'
import DataDisplay from './DataDisplay'
import Start from './Start'

const App = () => {

	return (
		<>
			<Start />
			<h1>Sonic Weather Station</h1>
			{/* <button type="button" onClick={init}>init</button> */}
			{/* <button type="button" onClick={toneFunc}>Start</button> */}
			{/* <button type="button" onClick={stopFunc}>Stop!</button>
			<button type="button" onClick={triggerRamps}>TriggerRamps!</button> */}
			{/* {
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
			} */}
			<DataDisplay />
			<Dots onChange={handleMouseMove} onClick={handleMouseClick} />
		</>

	)
}

export default App
