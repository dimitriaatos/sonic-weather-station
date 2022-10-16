import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { FlagsProvider } from 'react-feature-flags'
import App from './App'
import './index.css'

function resetHeight() {
	// reset the body height to that of the inner browser
	document.body.style.height = window.innerHeight + 'px'
}
// reset the height whenever the window's resized
window.addEventListener('resize', resetHeight)
// called to initially set the height.
resetHeight()

const FetchFlags = () => {
	const [flags, setFlags] = useState([])

	useEffect(() => {
		const getFlags = async () => {
			let flags
			try {
				const response = await fetch('/config.json')
				flags = await response.json()
			} catch (error) {
				console.log('No public/config.json file')
			}
			setFlags(flags || [])
		}
		getFlags()
	}, [])

	return (
		<FlagsProvider value={flags}>
			<App />
		</FlagsProvider>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<FetchFlags />
	// </React.StrictMode>
)
