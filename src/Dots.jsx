import { useEffect, useRef, useState } from 'react'
import { dotCoords, calcRadius, size, circleBorderRadius } from './dotsData'

const Dots = (props) => {
	const [coords, setCoords] = useState({ x: 0, y: 0 })
	const [dotsActive, setDotsActive] = useState(false)
	const dotsContainer = useRef()
	
	useEffect(() => {
		const dotsBounds = dotsContainer.current.getBoundingClientRect()
		const handleWindowMouseMove = event => {
			if (event.type == 'touchmove') event = event.targetTouches[0]
			const newCoords = {
				x: event.clientX - dotsBounds.left,
				y: event.clientY - dotsBounds.top,
			}
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
					width: size,
					height: size,
					cursor: dotsActive ? 'none' : 'default',
					// border: 'solid green 2px',
				}}
			>
				<svg
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				// style={{ border: 'solid green 2px', }}
				>
					<circle
						fill='none'
						stroke='gray'
						strokeWidth={1}
						cx={size / 2}
						cy={size / 2}
						r={circleBorderRadius}
					></circle>
					<g stroke="none" fill="black" fillRule="evenodd">
						{
							dotCoords.map(([x, y], index) => {
								return (
									<circle
										cx={x}
										cy={y}
										r={calcRadius(x, y, ...Object.values(coords))}
										key={index}
									></circle>
								)
							})
						}
					</g>
					<g fill="none" strokeWidth={2}>
						<circle stroke="black" cx={coords.x} cy={coords.y} r="15"></circle>
						<circle stroke="#979797" cx={coords.x} cy={coords.y} r="12"></circle>
					</g>
				</svg>
			</div>
		</div>
	)
}

export default Dots