import * as Tone from 'tone'


function init() {
    Tone.start();
    console.log("context started");
};

////////////
const detuneFilter = new Tone.Filter({
    frequency: 2500,
    type: "lowpass",
    rolloff: "-96",
    gain: "-80"
});
const detuneSynth = new Tone.DuoSynth({
    harmonicity: 2,
    vibratoAmount: 0.25,
    vibratoRate: 5,
    voice0: {
        oscillator: {
            type: "sawtooth"
        },
        volume: -20,
        envelope: {
            attack: 0.5,
            sustain: 1
        }
    },
    voice1: {
        oscillator: {
            type: "sawtooth"
        },
        volume: -15,
        envelope: {
            attack: 0.5,
            sustain: 1,
            release: 1
        }
    }
});
const movingDetuneSynth = new Tone.DuoSynth({
    harmonicity: 1.05,
    vibratoAmount: 0.25,
    vibratoRate: 4.8,
    voice0: {
        oscillator: {
            type: "sawtooth"
        },
        volume: -10,
        envelope: {
            attack: 0.5,
            sustain: 1
        }
    },
    voice1: {
        oscillator: {
            type: "sawtooth"
        },
        volume: -25,
        envelope: {
            attack: 0.5,
            sustain: 1,
            release: 1
        }
    }
});

const detuneEQ3 = new Tone.EQ3(0, -10, -10);
const detuneStereoWidener = new Tone.StereoWidener(1);
const movingDetuneFilter = new Tone.Filter({
    frequency: 100,
    type: "lowpass",
    rolloff: "-96",
    q: 0
});
const detuneFilterLFO = new Tone.LFO(0.01, 86, 420).start();
const detuneDelay = new Tone.FeedbackDelay("4t", 0.44);
const detuneFrequencyLFO = new Tone.LFO(0.025, (movingDetuneSynth.frequency.value - 1.70), (movingDetuneSynth.frequency.value + 2.37)).start();



detuneFilterLFO.connect(movingDetuneFilter.frequency);
detuneFilter.connect(detuneStereoWidener);
detuneSynth.connect(detuneEQ3);
movingDetuneSynth.connect(detuneEQ3); //seira chain synth-> eq3->filter->stereowidener->moving filter
detuneEQ3.connect(detuneFilter);
detuneStereoWidener.connect(movingDetuneFilter);
detuneFrequencyLFO.connect(movingDetuneSynth.frequency);
movingDetuneFilter.toDestination();
detuneDelay.fan(movingDetuneFilter);







Tone.Transport.start();

function toneFunc() {
    detuneSynth.triggerAttack("A0", "+0.5", 1)
    movingDetuneSynth.triggerAttack("A1", "+0.5", 1)
};

function stopFunc() {
    detuneSynth.triggerRelease("+0.1")
    movingDetuneSynth.triggerRelease("+0.1")
};


export{init, toneFunc, stopFunc};