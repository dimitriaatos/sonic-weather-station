import './Dots.css'
import { useRef, useState, useMemo } from 'react'
import { dotCoords, calcRadius, circleBorderRadius } from './dotsData'
import useSize from '@react-hook/size'

const Dots = (props) => {
	const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
	const [clickedCoords, setClickedCoords] = useState({ x: 0, y: 0 })
	const [dotsActive, setDotsActive] = useState(false)
	const [clicked, setClicked] = useState(false)
	const dotsContainer = useRef()
	const vminContainer = useRef()
	const [width, height] = useSize(vminContainer)

	const vmin = useMemo(() => Math.min(width, height), [width, height])

	const handleMouseMove = (event) => {
		const dotsBounds = dotsContainer.current?.getBoundingClientRect()
		const interaction =
			event.type == 'touchmove' ? event.targetTouches[0] : event
		const newCoords = {
			x: (interaction.clientX - dotsBounds.left) / vmin,
			y: (interaction.clientY - dotsBounds.top) / vmin,
		}

		setDotsActive(!Object.values(newCoords).some((val) => val > 1 || val < 0))

		setMouseCoords(newCoords)

		if (clicked || event.type == 'mousedown' || event.type == 'touchmove') {
			props?.onChange?.(newCoords)
			setClickedCoords(newCoords)
		}
	}

	const handleClick = (event) => {
		const isMouseDown = event.type == 'mousedown' || event.type == 'touchstart'
		if (isMouseDown) handleMouseMove(event)
		props?.onClick?.(isMouseDown)
		setClicked(isMouseDown)
	}

	return (
		<div
			ref={vminContainer}
			style={{
				margin: 'auto',
				// border: 'solid green 2px',
				width: '100%',
				height: '100%',
			}}
		>
			<div
				style={{
					cursor: dotsActive ? 'none' : 'default',
					width: vmin,
					height: vmin,
				}}
				className="dots-container"
				onMouseLeave={() => setDotsActive(false)}
				onMouseEnter={() => setDotsActive(true)}
				onMouseDown={handleClick}
				onMouseUp={handleClick}
				onTouchStart={handleClick}
				onTouchEnd={handleClick}
				onMouseMove={handleMouseMove}
				onTouchMove={handleMouseMove}
				ref={dotsContainer}
			>
				{dotsActive && (
					<div
						className="cursor-circle"
						style={{
							left: `calc(${mouseCoords.x * 100}% - 1em)`,
							top: `calc(${mouseCoords.y * 100}% - 1em)`,
						}}
					/>
				)}
				{dotCoords.map(([x, y], index) => {
					const radius =
						calcRadius(x, y, clickedCoords.x * 100, clickedCoords.y * 100) / 3
					return (
						<div
							className="circle"
							style={{
								top: y - radius + '%',
								left: x - radius + '%',
								width: 2 * radius + '%',
								height: 2 * radius + '%',
							}}
							key={index}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Dots
