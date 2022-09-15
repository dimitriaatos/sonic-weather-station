import * as Tone from 'tone'
import api from './api'
//Tone.setContext(new Tone.Context({ latencyHint : "playback" }))
function init() {
	//  Tone.start({latencyHint:"playback"})
	//   console.log('context started')
	//Tone.Transport.start()
}

const scale = (value, minIn, maxIn, minOut, maxOut) =>
	minOut + (maxOut - minOut) * ((value - minIn) / (maxIn - minIn))

////////////
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

// const detuneFilterLFO = new Tone.LFO(0.01, 112, 495).start()
//const detuneDelay = new Tone.FeedbackDelay('4t', 0.44)
const detuneFrequencyLFO = new Tone.LFO(0.025, -170, 237).start()
//const detuneReverb = new Tone.Reverb(5)
const layer1Vol = new Tone.Volume(0)
const layer2Vol = new Tone.Volume(0)
const layer3Vol = new Tone.Volume(0)
const layer4Vol = new Tone.Volume(0)

const volArray = [layer1Vol, layer2Vol, layer3Vol, layer4Vol]

// LAYER2 TSEKARE EDW GIA TI FASI ME TO LFO
const l2Noise = new Tone.NoiseSynth({
	noise: 'white',
	volume: -10,
	envelope: {
		attack: 20,
		decay: 0.1,
		sustain: 1,
	},
})

const l2Noise2 = new Tone.NoiseSynth({
	noise: 'white',
	volume: -10,
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

const layer2MovingVol = new Tone.Volume() ///TO VOLUME MODULE POU GINETE MODULATE
const l2filterLFO = new Tone.LFO(0.039, 191, 300).start()
const l2volLFO = new Tone.LFO(0.3, -80, -0.5).start() //AYTO se 0.3 hz apo -80 se 0.5

//LAYER3

const l3Poly = new Tone.PolySynth()
l3Poly.set({ oscillator: { type: 'sine2' }, volume: -5 })
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
//const l3filterLFO = new Tone.LFO(0.112, 104, 304).start()
const l3Tremolo = new Tone.Tremolo(3, 1)

//FIXED TRACK
const fixedTrack = new Tone.Player(
	'../media/composerSoundTest1.ogg'
).toDestination()
fixedTrack.loop = true
fixedTrack.loopStart = 0
fixedTrack.volume.value = -80
fixedTrack.autostart = true
//LAYER 4
const l4Noise = new Tone.Player('../media/gasparnoiseshort.mp3')
l4Noise.loop = true
l4Noise.loopStart = 0.0
l4Noise.volume.value = -80
l4Noise.autostart = true

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
//const l4FilterLFO1 = new Tone.LFO(0.112, 2000, 500).start()
//const l4FilterLFO2 = new Tone.LFO(0.141, 4000, 500).start()

function randomRange(min, max) {
	return min + Math.random() * (max - min)
}

const L4NoiseLFO1 = new Tone.Loop((time) => {
	// triggered every eighth note.
	let L4SnH = randomRange(2500, 10000)
	l4MovingFilter1.frequency.value = L4SnH
}, '8t').start(0)

const L4NoiseLFO2 = new Tone.Loop((time) => {
	// triggered every eighth note.
	let L4SnH2 = randomRange(2800, 20000)
	l4MovingFilter2.frequency.value = L4SnH2
}, '32t').start(0)

const dataKeys = ['airTemp', 'relativeHumidity', 'rain', 'barometer']

const masterFilter = new Tone.Filter({
	frequency: 20000,
	type: 'lowpass',
	rolloff: '-12',
	gain: 1,
	q: 1,
})
const dataSignals = dataKeys.reduce(
	(sigs, key) => ({
		...sigs,
		[key]: new Tone.Signal(0),
	}),
	{}
)

// l4FilterLFO1.connect(l4MovingFilter3.frequency)
// l4FilterLFO2.connect(l4MovingFilter4.frequency)
l4Noise.chain(
	layer4Vol,
	l4MovingFilter1,
	l4MovingFilter2,
	l4MovingFilter3,
	l4MovingFilter4,
	Tone.Destination
)

//l3filterLFO.connect(l3MovingFilter.frequency)
l2filterLFO.connect(l2MovingFilter.frequency)
//detuneFrequencyLFO.connect(movingDetuneSynth.detune)//
l2volLFO.connect(layer2MovingVol.volume) ///kanei connect se ena volume module
l2Noise.chain(
	l2Filter,
	l2MovingFilter,
	layer2Vol,
	layer2MovingVol,
	Tone.Destination
) //to volume module einai prin to master (diegrapse apo to chain ta moving Filters an se berdevun)
l2Noise2.chain(
	l2Filter2,
	l2MovingFilter,
	layer2Vol,
	layer2MovingVol,
	Tone.Destination
) //to volume module einai prin to master(diegrapse apo to chain ta moving Filters an se berdevun)

movingDetuneSynth.chain(
	layer1Vol,
	detuneEQ3,
	detuneFilter,
	detuneStereoWidener,
	movingDetuneFilter,
	Tone.Destination
)

detuneSynth.chain(
	layer1Vol,
	detuneEQ3,
	detuneFilter,
	detuneStereoWidener,
	movingDetuneFilter,
	Tone.Destination
)

l3Poly.chain(layer3Vol, l3Tremolo, l3Filter, l3MovingFilter, Tone.Destination)
// detuneFilterLFO.connect(movingDetuneFilter.frequency)

//l2Noise.fan(detuneDelay)
//l2Noise2.fan(detuneDelay)
//movingDetuneSynth.fan(detuneDelay)
//movingDetuneSynth.fan(detuneReverb)
//detuneSynth.fan(detuneDelay)
//detuneSynth.fan(detuneReverb)
//l3Poly.fan(detuneDelay)
//l3Poly.fan(detuneReverb)
let initialJitterTime = 1

const addDetune = new Tone.Add()
const signalDetuneRamp = new Tone.Signal(0).connect(addDetune)
const signalDetuneSnH = new Tone.Signal(0).connect(addDetune.addend)
addDetune.connect(movingDetuneSynth.detune)

const plot = new Tone.Waveform(128)
l3MovingFilter.frequency.connect(plot)

let dummySig = new Tone.Signal(0)

function toneFunc() {
	fixedTrack.volume.value = 0
	l4Noise.volume.value = -5

	Tone.Transport.start()

	detuneSynth.triggerAttack('A0', '+0.5', 1)
	movingDetuneSynth.triggerAttack('A1', '+0.5', 1)
	l2Noise.triggerAttack('+0.5', 1)
	l2Noise2.triggerAttack('+0.5', 1)
	l3Poly.triggerAttack(['A2', 'C#3', 'E3', 'G#3'], '+0.5', 1)

	api.update((current, prev, interval) => {
		console.log(current, prev, interval)
		// l4MovingFilter1.frequency.targetRampTo(data.rain, interval, 0)
		let airTempPct = (current.data.airTemp / 40) * 100
		let airTempPrevPct = (prev.data.airTemp / 40) * 100
		let airTempPctDiff = airTempPrevPct - airTempPct
		console.log(airTempPctDiff)

		Object.entries(dataSignals).forEach(([key, sig]) => {
			sig.value = prev.data[key]
			sig.rampTo(current.data[key], interval / 1000)
		})

		let barometerPct = ((current.data.barometer - 1000) / 30) * 100
		let barometerPrevPct = ((prev.data.barometer - 1000) / 30) * 100
		let barometerPctDiff = barometerPct - barometerPrevPct
		console.log(barometerPctDiff)
		let relativeHumidityPct = current.data.relativeHumidity
		let relativeHumidityPrevPct = prev.data.relativeHumidity
		let relativeHumidityPctDiff = relativeHumidityPct - relativeHumidityPrevPct
		console.log(relativeHumidityPct)
		console.log(relativeHumidityPrevPct)
		console.log(relativeHumidityPctDiff)

		let rain = current.data.rain + prev.data.rain
		if (rain > 0) {
			l2filterLFO.set({ max: 1000, min: 191 })
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
		console.log(l3MovingFilterPct)

		console.log(l4MovingFilterPct1)

		console.log(l4MovingFilterPct2)

		console.log(relativeHumidityPctDiff)
		if (dummySig.value < 0.00001) {
			dummySig.value = relativeHumidityPrevPct / 100
		}

		console.log(dummySig.value)
		if (relativeHumidityPctDiff > 0) {
			l4MovingFilter3.frequency.rampTo(
				randomRange(100, 300) + l4MovingFilter3.frequency.value,
				interval / 1000
			)
			l4MovingFilter4.frequency.rampTo(
				randomRange(150, 450) + l4MovingFilter4.frequency.value,
				interval / 1000
			)

			dummySig.rampTo(
				randomRange(0, 300) / 1000 + dummySig.value,
				interval / 1000
			)
		} else {
			l4MovingFilter3.frequency.rampTo(
				l4MovingFilter3.frequency.value - randomRange(100, 300),
				interval / 1000
			)
			l4MovingFilter4.frequency.rampTo(
				l4MovingFilter4.frequency.value - randomRange(100, 300),
				interval / 1000
			)
			dummySig.rampTo(
				dummySig.value - randomRange(0, 300) / 1000,
				interval / 1000
			)
		}

		signalDetuneRamp.rampTo(movingDetuneSynthPct, interval / 1000)
		movingDetuneFilter.frequency.rampTo(
			filterDetuneSynthPct + movingDetuneFilter.frequency.value,
			interval / 1000
		)
		l3MovingFilter.frequency.rampTo(
			l3MovingFilterPct + l3MovingFilter.frequency.value,
			interval / 1000
		)
		l4MovingFilter3.frequency.value = l4MovingFilterPrevPct1
		l4MovingFilter4.frequency.value = l4MovingFilterPrevPct2
	})

	const jitterDetune = new Tone.Loop((time) => {
		let jitterTime = randomRange(10, 25)
		jitterTime = Math.round(jitterTime)
		console.log(jitterTime)
		signalDetuneSnH.rampTo(randomRange(-200, 200), jitterTime)
		jitterDetune.interval = jitterTime
		jitterDetune.probability = 0.33
	}, initialJitterTime)
	jitterDetune.stop(0)
	jitterDetune.start(0)

	const jitterDetuneFilter = new Tone.Loop((time) => {
		let jitterTime = randomRange(10, 25)
		jitterTime = Math.round(jitterTime)
		console.log(jitterTime)
		movingDetuneFilter.detune.rampTo(randomRange(-300, 300), jitterTime)
		jitterDetuneFilter.interval = jitterTime
		jitterDetuneFilter.probability = 0.33
	}, initialJitterTime)
	jitterDetuneFilter.stop(0)
	jitterDetuneFilter.start(0)

	const playbackRateRamp = new Tone.Loop((time) => {
		l4Noise.playbackRate = dummySig.value
	}, 1)

	playbackRateRamp.start(0)
}

function stopFunc() {
	detuneSynth.triggerRelease('+0.1')
	movingDetuneSynth.triggerRelease('+0.1')
	l2Noise.triggerRelease('+0.1')
	l2Noise2.triggerRelease('+0.1')
	l3Poly.triggerRelease(['A2', 'C#3', 'E3', 'G#3'], '+0.1')
	l4Noise.stop()
	fixedTrack.stop()
}

function changeVol(target, value) {
	target.volume.value = value
}

const handleMouseMove = ({ x, y }) => {
	if (x <= 0.5) {
		layer1Vol.volume.value = scale(x, 0, 0.5, -35, 0)
		layer2Vol.volume.value = scale(x, 0, 0.5, -35, 0)
		layer3Vol.volume.value = scale(x, 0, 0.5, -35, -15)
		layer4Vol.volume.value = scale(x, 0, 0.5, -35, 0)
	} else {
		let xInv = 1 - x

		layer1Vol.volume.value = scale(xInv, 0, 0.5, -35, 0)
		layer2Vol.volume.value = scale(xInv, 0, 0.5, -35, 0)
		layer3Vol.volume.value = scale(xInv, 0, 0.5, -35, -15)
		layer4Vol.volume.value = scale(xInv, 0, 0.5, -35, 0)
	}
	if (y <= 0.5) {
		fixedTrack.volume.value = scale(y, 0, 0.5, -20, 0)
	} else {
		let yInv = 1 - y

		fixedTrack.volume.value = scale(yInv, 0, 0.5, -20, 0)
	}
}

const handleMouseClick = (isClicked) => {
	//isClicked: mouseDown true, mouseUp false
}

function triggerRamps() {
	/////na paei i loopa eksw apo to update kai na allazun ta noumera tis mesa apo to update

	console.log(l4MovingFilter4.frequency.value)
	console.log(l4MovingFilter4.frequency.value)

	setTimeout(() => {
		console.log(plot.getValue())
	}, 100)
	//detuneSynth.frequency.rampTo("1423",10)
	//movingDetuneSynth.detune.rampTo("1200",10)
}

export {
	init,
	toneFunc,
	stopFunc,
	changeVol,
	volArray,
	triggerRamps,
	handleMouseMove,
	handleMouseClick,
	dataSignals,
}
