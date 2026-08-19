export default function TitleScreen({ onStart, onResume }) {
	const hour = new Date().getHours()
	const greeting = hour < 12 ? 'GOOD MORNING'
			: hour < 17 ? 'GOOD AFTERNOON'
			: hour <20 ? 'GOOD EVENING'
			: 'GOODNIGHT'

	return (
		<div style={styles.wrapper}>

		{/*scanline effect */}
		<div style={styles.scanlines} />

		{/* title */}
		<div style={styles.titleBox}>
		<h1 style={styles.title}> ANA&apos;S</h1>
		<h1 style={styles.title}>PORTFOLIO</h1>
		<p style={styles.subtitle}> [ insert coin to begin ] </p>
		</div>

		{/* Buttons */}
		<div style={styles.buttonGroup}>
		<button style={styles.btn} onClick={onStart}>START GAME</button>
		
		<button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={onResume}>VIEW RESUME </button>
		</div>

		{/* Credits */}
		<p style={styles.credit}> {'\u00A9'} 2026 ANA T SANCHEZ</p>
		</div>
	)
}

const styles = {
	wrapper: {
		width: '100vw',
		height: '100vh',
		background: '#0a0a0f',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '40px',
		position: 'relative',
		overflow: 'hidden',
	},
	scanlines: {
		position: 'absolute',
		inset: 0,
		background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
		pointerEvents: 'none',
	},
	titleBox: {
		textAlign: 'center',
	},
	greeting: {
		fontFamily: '"Press Start 2P", monospace',
		fontsize: '9px',
		color: '#55557',
		marginBottom: '16px',
		letterSpacing: '2px',
	},
	title: {
		fontFamily: '"Press Start 2P", monospace',
		fontsize: 'clamp(28px,5vw,52px)',
		color: '#cc00ff',
		textShadow: '0 0 30px rgba(204,0,255,0.6), 4px 4px 0 #3a0060',
		lineHeight: 1.5,
	},
	subtitle: {
		
		fontFamily: '"Press Start 2P", monospace',
		fontSize: '11px',
		color: '#00ffcc',
		marginTop: '20px',
		animation: 'blink 1.2s step-end infinite',
	},
	buttonGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		alignItems: 'center',
	},
	btn: {

		fontFamily: '"Press Start 2P", monospace',
		fontSize: '12px',
		padding: '16px 36px',
		background: 'transparent',
		border: '2px solid #cc00ff',
		color: '#cc00ff',
		cursor: 'pointer',
		letterSpacing: '2px',
		transition: 'all 0.15s',
	},
	btnSecondary: {
		//border: '2px solid #555',
		//color: '#888',
		//fontSize: '10px',

		fontFamily: '"Press Start 2P", monospace',
		fontSize: '10.8px',
		padding: '16px 36px',
		background: 'transparent',
		border: '2px solid #cc00ff',
		color: '#cc00ff',
		cursor: 'pointer',
		letterSpacing: '2px',
		transition: 'all 0.15s',
	},
	credit: {

		fontFamily: '"Press Start 2P", monospace',
		fontSize: '7px',
		color: '#333',
		position: 'absolute',
		bottom: '20px',
	},
}
