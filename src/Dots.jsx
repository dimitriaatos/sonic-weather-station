import { useEffect, useState } from 'react'
import { dotPositions } from './dotsData'

const Dots = (props) => {
	const [coords, setCoords] = useState({ x: 0, y: 0 })
	const [replaceCursor, setReplaceCursor] = useState(false)

	const handleMouseMove = event => {
		setCoords({
			x: event.clientX - event.currentTarget.offsetLeft,
			y: event.clientY - event.currentTarget.offsetTop,
		});
		props?.onChange?.(coords)
	}

	const onLeave = () => {
		setReplaceCursor(false)
	}

	const onEnter = () => {
		setReplaceCursor(true)
	}

	// useEffect(() => {
	// 	console.log(replaceCursor ? 'visible' : 'hidden')
	// }, [replaceCursor])

	const calcRadius = (x, y) => {
		const distance = Math.sqrt(Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2))
		return Math.max(10 - distance / 25, 2)
	}

	return (
		<div
			style={{
				width: '100%',
				// border: 'solid green 2px'
			}}
		>
			<div
				onMouseLeave={onLeave}
				onMouseEnter={onEnter}
				onMouseMove={handleMouseMove}
				style={{ margin: 'auto', width: 420, cursor: replaceCursor ? 'none' : 'default' }}
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
									// <g key={index}>
									// 	<line x1={x} y1={y} x2={coords.x} y2={coords.y} stroke="#979797"></line>

									// 	<defs>
									// 		<linearGradient x1="40%" y1="40%" x2="100%" y2="100%" id={`linearGradient-${x}${y}`}>
									// 			<stop stopColor="red" stopOpacity="0" offset="0.00%"></stop>
									// 			<stop stopColor="green" offset="100%"></stop>
									// 		</linearGradient>
									// 	</defs>
									// 	<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
									// 		<line x1={x} y1={y} x2={coords.x} y2={coords.y} stroke={`url(#linearGradient-${x}${y})`}></line>
									// 	</g>
									// 	<circle cx={x} cy={y} r={calcRadius(x, y)}></circle>
									// </g>
									<circle cx={x} cy={y} r={calcRadius(x, y)} key={index}></circle>
								)
							})
						}
					</g>
					<g stroke="#979797" fill="none" visibility={replaceCursor ? 'visible' : 'hidden'}>
						<circle cx={coords.x} cy={coords.y} r="15"></circle>
						<circle cx={coords.x} cy={coords.y} r="12"></circle>
					</g>
				</svg>
			</div>
		</div>
	)
}

export default Dots