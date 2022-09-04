const size = 420
const circleAreaRadius = size * 0.38
const circleBorderRadius = size * 0.45

const getDistance = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

const getDotCoords = (distance, width, height, minMargin) => {
	const coords = []

	const activeWidth = width - minMargin * 2
	const activeHeight = height - minMargin * 2

	const xDotsNum = Math.floor(activeWidth / distance)
	const yDotsNum = Math.floor(activeHeight / distance)

	const dotsNum = xDotsNum * yDotsNum

	const centeredMarginX = (width - distance * (xDotsNum - 1)) / 2
	const centeredMarginY = (height - distance * (yDotsNum - 1)) / 2

	for (let index = 0; index < dotsNum; index++) {
		const x = distance * (index % xDotsNum) + centeredMarginX
		const y = distance * Math.floor(index / yDotsNum) + centeredMarginY
		if (getDistance(x, y, size / 2, size / 2) < circleAreaRadius) {
			coords.push([x, y])
		}
	}
	return coords
}

const calcRadius = (x, y, mouseX, mouseY) => {
	const distance = getDistance(x, y, mouseX, mouseY)
	return Math.max(7 - distance / 30, 1.5)
}

export { getDotCoords, calcRadius, getDistance, size, circleBorderRadius }
