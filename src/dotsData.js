const circleAreaRadius = 40
const circleBorderRadius = 45
const spread = 6
const distance = 6.7
const margin = 0
const maxRadius = 4
const minRadius = 0.8

const getDistance = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

const getDotCoords = (distance, minMargin) => {
	const coords = []
	const max = 100

	const activeWidth = max - minMargin * 2
	const activeHeight = max - minMargin * 2

	const xDotsNum = Math.floor(activeWidth / distance)
	const yDotsNum = Math.floor(activeHeight / distance)

	const dotsNum = xDotsNum * yDotsNum

	const centeredMarginX = (max - distance * (xDotsNum - 1)) / 2
	const centeredMarginY = (max - distance * (yDotsNum - 1)) / 2

	for (let index = 0; index < dotsNum; index++) {
		const x = distance * (index % xDotsNum) + centeredMarginX
		const y = distance * Math.floor(index / yDotsNum) + centeredMarginY
		if (getDistance(x, y, max / 2, max / 2) < circleAreaRadius) {
			coords.push([x, y])
		}
	}
	return coords
}

const calcRadius = (x, y, mouseX, mouseY) => {
	const distance = getDistance(x, y, mouseX, mouseY)
	return Math.max(maxRadius - distance / spread, minRadius)
}

const dotCoords = getDotCoords(distance, margin)

export { getDotCoords, calcRadius, getDistance, circleBorderRadius, dotCoords }
