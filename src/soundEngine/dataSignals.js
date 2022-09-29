import * as Tone from 'tone'
import dataMap from '../dataMap'
import { randomRange, randomRangeCentered } from '../helpers'

const dataSignals = Object.entries(dataMap).reduce((sigs, [key, value]) => {
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
			noise.value = randomRangeCentered(dataMap[key].randomRange)
		}
	})
	dataNoiseLoop.interval = randomRange(1, 3)
}, 2)

export { dataNoiseLoop }
export default dataSignals
