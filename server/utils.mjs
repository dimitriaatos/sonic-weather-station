const toCamel = (str) =>
	str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

const getQueryDateFormat = (date) => {
	const isoString = date.toISOString()
	return `${isoString.substring(0, 10)} ${isoString.substring(11, 19)}`
}

const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(fn))

export { toCamel, getQueryDateFormat, objectMap }
