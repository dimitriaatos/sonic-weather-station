import * as Tone from 'tone'
import { randomRange, randomRangeCentered } from '../helpers'

const randomRanges = {
	airTemp: 0.5,
	relativeHumidity: 0.5,
	rain: 0,
	barometer: 0.5,
}

const dataSignals = Object.keys(randomRanges).reduce((sigs, key) => {
	const signal = new Tone.Signal(0)
	const noise = new Tone.Signal(0)

	return {
		...sigs,
		[key]: {
			signal,
			noise,
		},
	}
}, {})

const dataNoiseLoop = new Tone.Loop(() => {
	Object.entries(dataSignals).forEach(([key, { noise }]) => {
		if (randomRange(0, 1) > 0.5) {
			noise.value = randomRangeCentered(randomRanges[key])
		}
	})
	dataNoiseLoop.interval = randomRange(1, 3)
}, 2)

export { dataNoiseLoop }
export default dataSignals
