import { Flags } from 'react-feature-flags'
import './Start.css'

const Start = (props) => {
	return (
		<div className="start">
			<div className="info">
				<span>STAVROS GASPARATOS</span>
				<br />
				Sonic Weather Station, 2022 - ongoing
			</div>
			<h1>Sonic Weather Station</h1>
			<div className="main-text">
				The Station is an online programme that generates sonic output by
				receiving combined weather data from a physical weather station in
				Greece.
			</div>
			<button
				type="button"
				className="start-button"
				onClick={() => props?.onClick?.()}
			>
				Enter
			</button>
			<footer>
				<div className="main-footer">
					Commissioned by NEON, for &apos;112, Climate Tone&apos; as part of the
					World Weather Network © the artist, Courtesy NEON
				</div>
				<div className="links">
					<a href="http://www.stavrosgasparatos.com">Stavros Gasparatos</a>
					<a href="https://neon.org.gr">NEON</a>
					<a href="https://neon.org.gr/en/exhibition/112-climate-tone-2/">
						112, Climate Tone
					</a>
					<a href="https://worldweathernetwork.org/">World Weather Network</a>
				</div>
				<div className="credits">
					<div>
						Live Weather Data: Automatic Meteorological Station - Park of
						Aristotle University of Thessaloniki; Department of Meteorology and
						Climatology, In collaboration with Professor Prodromos Zanis
					</div>
					<div>
						Programming - Software Development: Dimitri Aatos Ellinas
						<span> </span>
						Audio Implementation - Sonification: Georgios Mizithras
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Start
