import { compose } from 'ramda'

const secToMs = (sec) => sec * 1000

const minToSec = (min) => min * 60

const minToMs = (min) => compose(secToMs, minToSec)(min)

export { minToMs, secToMs, minToSec }
