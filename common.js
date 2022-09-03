const port = 3000

const minToMs = (min) => min * 60 * 1000

const poll = minToMs(10)

export { port, poll }
