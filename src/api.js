const call = async (params) => {
	const url = new URL(`${origin}/api`)
	url.search = new URLSearchParams(params).toString()
	return await fetch(url, { mode: 'cors' })
}

export default {
	call,
}
