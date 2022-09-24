const scale = (value, minIn, maxIn, minOut, maxOut) =>
	minOut + (maxOut - minOut) * ((value - minIn) / (maxIn - minIn))

const randomRange = (min, max) => min + Math.random() * (max - min)

const randomRangeCentered = (halfRange, center = 0) => {
	halfRange = Math.abs(halfRange)
	return randomRange(center - halfRange, center + halfRange)
}

const fixValue = (value) => Math.min(2 * (1 - Math.min(value, 1)), 1)

const calcDistanceFromCorners = ({ x, y }) => {
	const max = 1

	const xPow = Math.pow(x, 2)
	const yPow = Math.pow(y, 2)
	const xRevPow = Math.pow(max - x, 2)
	const yRevPow = Math.pow(max - y, 2)

	const upperLeft = Math.pow(xPow + yPow, 0.5)
	const bottomLeft = Math.pow(xPow + yRevPow, 0.5)
	const bottomRight = Math.pow(xRevPow + yRevPow, 0.5)
	const upperRight = Math.pow(yPow + xRevPow, 0.5)

	let dim = { upperLeft, bottomLeft, bottomRight, upperRight }

	dim = Object.fromEntries(
		Object.entries(dim).map(([key, value]) => [key, fixValue(value)])
	)

	return dim
}

export { scale, randomRange, randomRangeCentered, calcDistanceFromCorners }
