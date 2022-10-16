import * as Tone from 'tone'
import dummyData from '../../common/dummyData'
import * as api from '../api'
import { scale, randomRange } from '../helpers'
import dataSignals, { dataNoiseLoop } from './dataSignals'

// Tone.setContext(
// 	new Tone.Context({ latencyHint: 'playback', sampleRate: 11025 })
// )

const masterBitCrusher = new Tone.Distortion(0.2).toDestination()

const comp = new Tone.Compressor(-80, 12)

masterBitCrusher.wet.value = 0

const detuneFilter = new Tone.Filter({
	frequency: 2500,
	type: 'lowpass',
	rolloff: '-48',
	gain: '-80',
})

const detuneSynth = new Tone.DuoSynth({
	harmonicity: 2,
	vibratoAmount: 0.25,
	vibratoRate: 5,
	voice0: {
		oscillator: {
			type: 'sawtooth',
		},
		volume: -25,
		envelope: {
			attack: 0.5,
			sustain: 1,
		},
	},
	voice1: {
		oscillator: {
			type: 'sawtooth',
		},
		volume: -15,
		envelope: {
			attack: 0.5,
			sustain: 1,
			release: 1,
		},
	},
})

const movingDetuneSynth = new Tone.DuoSynth({
	harmonicity: 1.05,
	vibratoAmount: 0.25,
	vibratoRate: 4.8,
	voice0: {
		oscillator: {
			type: 'sawtooth',
		},
		volume: -15,
		envelope: {
			attack: 0.5,
			sustain: 1,
		},
	},
	voice1: {
		oscillator: {
			type: 'sawtooth',
		},
		volume: -25,
		envelope: {
			attack: 0.5,
			sustain: 1,
			release: 1,
		},
	},
})

const detuneEQ3 = new Tone.EQ3(0, -10, -10)

const detuneStereoWidener = new Tone.StereoWidener(1)

const movingDetuneFilter = new Tone.Filter({
	frequency: 375,
	type: 'lowpass',
	rolloff: '-96',
	q: 0,
})

const layer1Vol = new Tone.Volume(0)
const layer2Vol = new Tone.Volume(0)
const layer3Vol = new Tone.Volume(0)
const layer4Vol = new Tone.Volume(0)

const volumes = [layer1Vol, layer2Vol, layer3Vol, layer4Vol]

// LAYER2
const l2Noise = new Tone.NoiseSynth({
	noise: 'pink',
	volume: -8,
	envelope: {
		attack: 20,
		decay: 0.1,
		sustain: 1,
	},
})

const l2Noise2 = new Tone.NoiseSynth({
	noise: 'pink',
	volume: -8,
	envelope: {
		attack: 20,
		decay: 0,
		sustain: 1,
	},
})

const l2Filter = new Tone.Filter({
	frequency: 577,
	type: 'lowpass',
	rolloff: '-96',
	gain: 1,
	q: 1,
})
const l2Filter2 = new Tone.Filter({
	frequency: 784,
	type: 'lowpass',
	rolloff: '-96',
	gain: 1,
	q: 1,
})

const l2MovingFilter = new Tone.Filter({
	frequency: 784,
	type: 'lowpass',
	rolloff: '-96',
	gain: 0,
	q: 1,
})

const layer2MovingVol = new Tone.Volume()
const l2filterLFO = new Tone.LFO(0.039, 291, 400).start()
const l2volLFO = new Tone.LFO(0.3, -80, -0.5).start()

// LAYER3

const l3Poly = new Tone.PolySynth()
l3Poly.set({ oscillator: { type: 'sine2' }, volume: -10 })

const l3Filter = new Tone.Filter({
	frequency: 1800,
	type: 'lowpass',
	rolloff: '-48',
	gain: 0,
	q: 0,
})

const l3MovingFilter = new Tone.Filter({
	frequency: 784,
	type: 'lowpass',
	rolloff: '-12',
	gain: 0,
	q: 1,
})

const l3Tremolo = new Tone.Tremolo(3, 1)

//FIXED TRACK
const fixedTrack = new Tone.Player().toDestination()
fixedTrack.loop = true
fixedTrack.loopStart = 0
fixedTrack.volume.value = -80

const SOStone = new Tone.Player().toDestination()
SOStone.volume.value = -5

//LAYER 4
const l4Noise = new Tone.Player()
l4Noise.loop = true
l4Noise.loopStart = 0.0
l4Noise.volume.value = -80

const players = { fixedTrack, SOStone, l4Noise }

const loopingFileExtension = 'mp3'

const audioFilePaths = {
	fixedTrack: `media/ComposedSoundTest2.${loopingFileExtension}`,
	SOStone: `media/SOSTone1.${loopingFileExtension}`,
	l4Noise: 'media/gasparnoiseshort.mp3',
}

const l4MovingFilter1 = new Tone.Filter({
	frequency: 1800,
	type: 'highpass',
	rolloff: '-12',
	gain: 1,
	q: 1,
})

const l4MovingFilter2 = new Tone.Filter({
	frequency: 1800,
	type: 'highpass',
	rolloff: '-12',
	gain: 1,
	q: 1,
})

const l4MovingFilter3 = new Tone.Filter({
	frequency: 750,
	type: 'lowpass',
	rolloff: '-12',
	gain: 1,
	q: 1,
})

const l4MovingFilter4 = new Tone.Filter({
	frequency: 1000,
	type: 'peaking',
	gain: 1,
	q: 1,
})

const L4NoiseLFO1 = new Tone.Loop((time) => {
	let L4SnH = randomRange(2500, 10000)
	l4MovingFilter1.frequency.value = L4SnH
}, '8t').start(0)

const L4NoiseLFO2 = new Tone.Loop((time) => {
	let L4SnH2 = randomRange(2800, 20000)
	l4MovingFilter2.frequency.value = L4SnH2
}, '32t').start(0)

const masterFilter = new Tone.Filter({
	frequency: 20000,
	type: 'lowpass',
	rolloff: '-12',
	gain: 1,
	q: 1,
})

l4Noise.chain(
	layer4Vol,
	l4MovingFilter1,
	l4MovingFilter2,
	l4MovingFilter3,
	l4MovingFilter4
)
l4MovingFilter4.connect(masterBitCrusher)

l2filterLFO.connect(l2MovingFilter.frequency)
l2volLFO.connect(layer2MovingVol.volume) ///kanei connect se ena volume module
l2Noise.chain(
	l2Filter,
	comp,
	l2MovingFilter,
	layer2Vol,
	masterBitCrusher,
	layer2MovingVol
) //to volume module einai prin to master (diegrapse apo to chain ta moving Filters an se berdevun)
l2Noise2.chain(
	l2Filter2,
	comp,
	l2MovingFilter,
	layer2Vol,
	masterBitCrusher,
	layer2MovingVol
) //to volume module einai prin to master(diegrapse apo to chain ta moving Filters an se berdevun)
movingDetuneSynth.chain(
	layer1Vol,
	detuneEQ3,
	detuneFilter,
	detuneStereoWidener,
	movingDetuneFilter
)

detuneSynth.chain(
	layer1Vol,
	detuneEQ3,
	detuneFilter,
	detuneStereoWidener,
	movingDetuneFilter
)
movingDetuneFilter.connect(masterBitCrusher)

l3Poly.chain(layer3Vol, l3Tremolo, l3Filter, l3MovingFilter)
l3MovingFilter.connect(masterBitCrusher)

let initialJitterTime = 1

const addDetune = new Tone.Add()
const signalDetuneRamp = new Tone.Signal(0).connect(addDetune)
const signalDetuneSnH = new Tone.Signal(0).connect(addDetune.addend)
addDetune.connect(movingDetuneSynth.detune)

const plot = new Tone.Waveform(128)
l3MovingFilter.frequency.connect(plot)

let dummySig = new Tone.Signal(0)

function start() {
	Tone.Transport.start()
	SOStone.start()
	fixedTrack.start()
	l4Noise.start()
	fixedTrack.volume.value = 5
	l4Noise.volume.value = -5
	detuneSynth.triggerAttack('A0', '+0.5', 1)
	movingDetuneSynth.triggerAttack('A1', '+0.5', 1)
	l2Noise.triggerAttack('+0.5', 1)
	l2Noise2.triggerAttack('+0.5', 1)
	l3Poly.triggerAttack(['A2', 'C#3', 'E3', 'G#3'], '+0.5', 1)

	api.update((current = dummyData[0], prev = dummyData[1], interval) => {
		console.log('data', current, prev, interval)

		if (dataNoiseLoop.started != 'started') {
			dataNoiseLoop.start(0)
		}

		let airTempPct = (current.data.airTemp / 40) * 100
		let airTempPrevPct = (prev.data.airTemp / 40) * 100
		let airTempPctDiff = airTempPrevPct - airTempPct

		Object.entries(dataSignals).forEach(([key, { signal }]) => {
			signal.value = prev.data[key]
			signal.rampTo(current.data[key], interval)
		})

		let barometerPct = ((current.data.barometer - 1000) / 30) * 100
		let barometerPrevPct = ((prev.data.barometer - 1000) / 30) * 100
		let barometerPctDiff = barometerPct - barometerPrevPct
		let relativeHumidityPct = current.data.relativeHumidity
		let relativeHumidityPrevPct = prev.data.relativeHumidity
		let relativeHumidityPctDiff = relativeHumidityPct - relativeHumidityPrevPct

		let rain = current.data.rain + prev.data.rain
		if (rain > 0) {
			masterBitCrusher.wet.rampTo(randomRange(0.1, 1))
		} else {
			masterBitCrusher.wet.value = 0
		}
		let windPct = current.data.wind - prev.data.wind
		if (windPct > 0) {
			l2MovingFilter.detune.rampTo(randomRange(500, 1200), interval)
		} else {
			l2MovingFilter.detune.rampTo(randomRange(500, 1200) * -1, interval)
		}
		let l3MovingFilterPct = (barometerPctDiff / 100) * 1000 * 20
		let movingDetuneSynthPct = (airTempPctDiff / 100) * 1200 * 100 ///max range to detune tritos arithmos=multiplier twn data
		let filterDetuneSynthPct = (airTempPctDiff / 100) * 1000 * 10

		let l4MovingFilterPct1 =
			(500 + (2000 - 500) * (relativeHumidityPct / 100)) * 5
		let l4MovingFilterPrevPct1 =
			500 + (2000 - 500) * (relativeHumidityPrevPct / 100)
		let l4MovingFilterPct2 =
			(500 + (4000 - 500) * (relativeHumidityPct / 100)) * 5
		let l4MovingFilterPrevPct2 =
			500 + (4000 - 500) * (relativeHumidityPrevPct / 100)
		movingDetuneSynthPct = movingDetuneSynthPct.toString()

		if (dummySig.value < 0.00001) {
			dummySig.value = relativeHumidityPrevPct / 100
		}

		if (relativeHumidityPctDiff > 0) {
			l4MovingFilter3.frequency.rampTo(
				randomRange(100, 300) + l4MovingFilter3.frequency.value,
				interval
			)
			l4MovingFilter4.frequency.rampTo(
				randomRange(150, 450) + l4MovingFilter4.frequency.value,
				interval
			)

			dummySig.rampTo(randomRange(0, 300) / 1000 + dummySig.value, interval)
		} else {
			l4MovingFilter3.frequency.rampTo(
				l4MovingFilter3.frequency.value + randomRange(100, 300),
				interval
			)
			l4MovingFilter4.frequency.rampTo(
				l4MovingFilter4.frequency.value + randomRange(100, 300),
				interval
			)
			dummySig.rampTo(dummySig.value - randomRange(0, 300) / 1000, interval)
		}

		signalDetuneRamp.rampTo(movingDetuneSynthPct, interval)
		movingDetuneFilter.frequency.rampTo(
			filterDetuneSynthPct + movingDetuneFilter.frequency.value,
			interval
		)
		l3MovingFilter.frequency.rampTo(
			l3MovingFilterPct + l3MovingFilter.frequency.value,
			interval
		)
		l4MovingFilter3.frequency.value = l4MovingFilterPrevPct1
		l4MovingFilter4.frequency.value = l4MovingFilterPrevPct2
	})

	const jitterDetune = new Tone.Loop((time) => {
		let jitterTime = randomRange(10, 25)
		jitterTime = Math.round(jitterTime)
		signalDetuneSnH.rampTo(randomRange(-200, 200), jitterTime)
		jitterDetune.interval = jitterTime
	}, initialJitterTime)

	jitterDetune.probability = 0.33
	jitterDetune.stop(0)
	jitterDetune.start(0)

	const jitterDetuneFilter = new Tone.Loop((time) => {
		let jitterTime = randomRange(10, 25)
		jitterTime = Math.round(jitterTime)
		movingDetuneFilter.detune.rampTo(randomRange(-300, 300), jitterTime)
		jitterDetuneFilter.interval = jitterTime
	}, initialJitterTime)

	jitterDetuneFilter.probability = 0.33
	jitterDetuneFilter.stop(0)
	jitterDetuneFilter.start(0)

	const playbackRateRamp = new Tone.Loop((time) => {
		l4Noise.playbackRate = dummySig.value
	}, 1)

	playbackRateRamp.start(0)
}

function stop() {
	detuneSynth.triggerRelease('+0.1')
	movingDetuneSynth.triggerRelease('+0.1')
	l2Noise.triggerRelease('+0.1')
	l2Noise2.triggerRelease('+0.1')
	l3Poly.triggerRelease(['A2', 'C#3', 'E3', 'G#3'], '+0.1')
	l4Noise.stop()
	fixedTrack.stop()
}

const handleVolumes = ({ bottomLeft, bottomRight, upperRight, upperLeft }) => {
	layer1Vol.volume.rampTo(scale(bottomLeft, 0, 1, -20, 0), 0.1) /// logarithmic multiplier
	layer2Vol.volume.rampTo(scale(bottomRight, 0, 1, -20, 0), 0.1)
	layer3Vol.volume.rampTo(scale(upperRight, 0, 1, -20, 5), 0.1)
	layer4Vol.volume.rampTo(scale(upperLeft, 0, 1, -20, 10), 0.1)
}

const handleMouseClick = (isClicked) => {
	if (!isClicked) {
		const fadeBackTime = 0.3
		volumes.forEach((vol) => vol.volume.rampTo(0, fadeBackTime))
		fixedTrack.volume.rampTo(0, fadeBackTime)
	} else {
		console.log('click!')
	}
}

export { start, stop, volumes, handleVolumes, handleMouseClick }
export { dataSignals }
export { players, audioFilePaths }
