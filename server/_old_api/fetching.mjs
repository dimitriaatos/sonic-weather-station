import { compose } from 'ramda'
import { xml2json } from 'xml-js'
import { URLs } from './constants.mjs'
import { parseResults } from './parsing.mjs'
import { dummyData, combineApiResponses } from '../../common/dummyData.js'
import fetch from 'node-fetch'

const call = async ({ from, to, name }) => {
	try {
		const response = await fetch(`${URLs[name]}|${from}|${to}`)
		const text = await response.text()
		const json = xml2json(text, {
			compact: true,
			nativeType: true,
			nativeTypeAttributes: true,
			textKey: 'text',
		})
		return compose(parseResults, JSON.parse)(json)
	} catch (error) {
		return dummyData[name]
	}
}

const getBoth = async (options = {}) => {
	const requests = Object.keys(URLs).map((name) => call({ ...options, name }))
	const responses = await Promise.all(requests)

	const combinedResponses = combineApiResponses(responses)
	return combinedResponses
}

export { getBoth, call }
