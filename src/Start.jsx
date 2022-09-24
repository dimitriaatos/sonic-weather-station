import './Start.css'

const Start = (props) => {
	return (
		<div className="start">
			<h1>Sonic Weather Station</h1>
			<button type="button" onClick={() => props?.onClick?.()}>
				Enter
			</button>
		</div>
	)
}

export default Start
