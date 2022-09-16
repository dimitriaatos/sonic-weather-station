const scale = (value, minIn, maxIn, minOut, maxOut) =>
	minOut + (maxOut - minOut) * ((value - minIn) / (maxIn - minIn))

const randomRange = (min, max) => min + Math.random() * (max - min)

const randomRangeCentered = (halfRange, center = 0) => {
	halfRange = Math.abs(halfRange)
	return randomRange(center - halfRange, center + halfRange)
}

export { scale, randomRange, randomRangeCentered }
