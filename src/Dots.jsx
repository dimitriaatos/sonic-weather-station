import { useEffect, useRef, useState } from 'react'
import { dotPositions } from './dotsData'

const Dots = (props) => {
	const [coords, setCoords] = useState({ x: 0, y: 0 })
	const [dotsActive, setDotsActive] = useState(false)
	const dotsContainer = useRef()

	useEffect(() => {
		const handleWindowMouseMove = event => {
			if (event.type == 'touchmove') event = event.targetTouches[0]
			const dotsBounds = dotsContainer.current.getBoundingClientRect()
			const newCoords = {
				x: event.clientX - dotsBounds.left,
				y: event.clientY - dotsBounds.top,
			}
			console.log(event)
			setCoords(newCoords);
			props?.onChange?.(newCoords)
		};

		document.addEventListener('mousemove', handleWindowMouseMove);
		document.addEventListener('touchmove', handleWindowMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleWindowMouseMove);
			document.removeEventListener('touchmove', handleWindowMouseMove);
		};
	}, []);

	const calcRadius = (x, y) => {
		const distance = Math.sqrt(Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2))
		return Math.max(10 - distance / 25, 2)
	}

	return (
		<div
			style={{
				width: '100%',
			}}
		>
			<div
				onMouseLeave={() => setDotsActive(false)}
				onMouseEnter={() => setDotsActive(true)}
				ref={dotsContainer}
				style={{
					margin: 'auto',
					width: 420,
					height: 420,
					cursor: dotsActive ? 'none' : 'default',
				}}
			>
				<svg
					width="420px"
					height="420px"
					viewBox="0 0 420 420"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				>
					<g stroke="none" fill="black" fillRule="evenodd">
						{
							dotPositions.map(([x, y], index) => {
								return (
									<circle cx={x} cy={y} r={calcRadius(x, y)} key={index}></circle>
								)
							})
						}
					</g>
					<g stroke="#979797" fill="none">
						<circle cx={coords.x} cy={coords.y} r="15"></circle>
						<circle cx={coords.x} cy={coords.y} r="12"></circle>
					</g>
				</svg>
			</div>
		</div>
	)
}

export default Dots