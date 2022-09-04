import * as Tone from 'tone'
import api from './api'

function init() {
	Tone.start()
	console.log('context started')
}

////////////
const detuneFilter = new Tone.Filter({
	frequency: 2500,
	type: 'lowpass',
	rolloff: '-96',
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
		volume: -20,
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
		volume: -10,
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
	frequency: 100,
	type: 'lowpass',
	rolloff: '-96',
	q: 0,
})
const detuneFilterLFO = new Tone.LFO(0.01, 112, 495).start()
const detuneDelay = new Tone.FeedbackDelay('4t', 0.44)
const detuneFrequencyLFO = new Tone.LFO(0.025, -170, 237).start()
const detuneReverb = new Tone.Reverb(5)
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
		attack: 200,
		decay: 0.1,
		sustain: 1,
	},
})

const l2Noise2 = new Tone.NoiseSynth({
	noise: 'white',
	volume: -10,
	envelope: {
		attack: 200,
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
const l2filterLFO = new Tone.LFO(0.039, 91, 368).start()
const l2volLFO = new Tone.LFO(0.3, -80, -0.5).start() //AYTO se 0.3 hz apo -80 se 0.5

//LAYER3

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
const l3filterLFO = new Tone.LFO(0.112, 104, 304).start()
const l3Tremolo = new Tone.Tremolo(3, 1)

//LAYER 4
const l4Noise = new Tone.Player("../media/gasparnoiseshort.mp3");
l4Noise.loop = true;
l4Noise.loopStart = (0.05);
l4Noise.volume.value = 6;
const l4MovingFilter1 = new Tone.Filter({
    frequency: 1800,
    type: 'highpass',
    rolloff: '-12',
    gain: 1,
    q: 1
  })

const l4MovingFilter2 = new Tone.Filter({
    frequency: 1800,
    type: 'highpass',
    rolloff: '-12',
    gain: 1,
    q: 1
  })

  const l4MovingFilter3 = new Tone.Filter({
    frequency: 5000,
    type: 'lowpass',
    rolloff: '-12',
    gain: 1,
    q: 1
  })
  const l4MovingFilter4 = new Tone.Filter({
    frequency: 5000,
    type: 'peaking',
    gain: 1,
    q: 1
  })
 const l4FilterLFO1 =  new Tone.LFO(0.112, 2000, 500).start()
 const l4FilterLFO2 =  new Tone.LFO(0.141, 4000, 500).start()

 function randomRange(min, max){
    return min + Math.random() * (max - min)
    }



 const L4NoiseLFO1 = new Tone.Loop((time) => {
	// triggered every eighth note.
	let L4SnH = randomRange(2500, 10000)
    l4MovingFilter1.frequency.value = L4SnH;
}, "8t").start(0);

const L4NoiseLFO2 = new Tone.Loop((time) => {
	// triggered every eighth note.
	let L4SnH2 = randomRange(2800, 20000)
    l4MovingFilter2.frequency.value = L4SnH2;
}, "32t").start(0);


l4FilterLFO1.connect(l4MovingFilter3.frequency);
l4FilterLFO2.connect(l4MovingFilter4.frequency);
l4Noise.chain(layer4Vol,l4MovingFilter1,l4MovingFilter2,l4MovingFilter3,l4MovingFilter4, Tone.Destination);

l3filterLFO.connect(l3MovingFilter.frequency)
l2filterLFO.connect(l2MovingFilter.frequency)
detuneFrequencyLFO.connect(movingDetuneSynth.detune)
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
detuneFilterLFO.connect(movingDetuneFilter.frequency)

l2Noise.fan(detuneDelay)
l2Noise2.fan(detuneDelay)
movingDetuneSynth.fan(detuneDelay)
movingDetuneSynth.fan(detuneReverb)
detuneSynth.fan(detuneDelay)
detuneSynth.fan(detuneReverb)
l3Poly.fan(detuneDelay)
l3Poly.fan(detuneReverb)



function toneFunc() {
	Tone.Transport.start()
	detuneSynth.triggerAttack('A0', '+0.5', 1)
	movingDetuneSynth.triggerAttack('A1', '+0.5', 1)
	l2Noise.triggerAttack('+0.5', 1)
	l2Noise2.triggerAttack('+0.5', 1)
	l3Poly.triggerAttack(['A2', 'C#3', 'E3', 'G#3'], '+0.5', 1)
  l4Noise.start()
	api.update((data, prevData, interval) => {
		console.log(data, prevData, interval)
		// l4MovingFilter1.frequency.targetRampTo(data.rain, interval, 0)
	})
}

function stopFunc() {
  detuneSynth.triggerRelease('+0.1')
  movingDetuneSynth.triggerRelease('+0.1')
  l2Noise.triggerRelease('+0.1')
  l2Noise2.triggerRelease('+0.1')
  l3Poly.triggerRelease(['A2', 'C#3', 'E3', 'G#3'], '+0.1')
  l4Noise.stop()
}

function changeVol(target, value) {
	target.volume.value = value
}

export { init, toneFunc, stopFunc, changeVol, volArray }
