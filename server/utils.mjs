const toCamel = (str) =>
	str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

export { toCamel }
