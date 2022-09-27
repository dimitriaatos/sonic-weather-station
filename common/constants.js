const port = 3000

const interval = 10

// 4 minutes for the API data to be ready
const backendOffset = 4

// adding one minute for the API to respond
const frontendOffset = backendOffset + 1

export { port, interval, backendOffset, frontendOffset }
