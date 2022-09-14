import { useRef, useState } from 'react'
import { dotCoords, calcRadius, size, circleBorderRadius } from './dotsData'

const scaleCoords = ({ x, y }) => ({ x: x / size, y: y / size })

const Dots = (props) => {
	const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
	const [clickedCoords, setClickedCoords] = useState({ x: 0, y: 0 })
	const [dotsActive, setDotsActive] = useState(false)
	const [clicked, setClicked] = useState(false)
	const dotsContainer = useRef()

	const handleMouseMove = event => {
		const dotsBounds = dotsContainer.current?.getBoundingClientRect()
		const interaction = event.type == 'touchmove' ? event.targetTouches[0] : event

		const newCoords = {
			x: interaction.clientX - dotsBounds.left,
			y: interaction.clientY - dotsBounds.top,
		}

		setMouseCoords(newCoords);

		if (clicked || event.type == 'mousedown' || event.type == 'touchmove') {
			props?.onChange?.(scaleCoords(newCoords))
			setClickedCoords(newCoords)
		}
	};

	const handleClick = event => {
		const mouseDown = event.type == 'mousedown'
		if (mouseDown) handleMouseMove(event)
		setClicked(mouseDown)
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
				onMouseDown={handleClick}
				onMouseUp={handleClick}
				onMouseMove={handleMouseMove}
				onTouchMove={handleMouseMove}
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
										r={calcRadius(x, y, ...Object.values(clickedCoords))}
										key={index}
									></circle>
								)
							})
						}
					</g>
					{dotsActive && <g fill="none" strokeWidth={2}>
						<circle stroke="black" cx={mouseCoords.x} cy={mouseCoords.y} r="15"></circle>
						<circle stroke="#979797" cx={mouseCoords.x} cy={mouseCoords.y} r="12"></circle>
					</g>}
				</svg>
			</div>
		</div>
	)
}

export default Dots