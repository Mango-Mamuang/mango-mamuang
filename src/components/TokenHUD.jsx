export default function TokenHUD({tokens}) {
	return (
		<div style={{
			position: 'fixed',
			top: '16px',
			right: '20px',
			fontFamily: '"Press Start 2P", monospace',
			fontSize: '11px',
			color: '#ffcc00',
			background: 'rgba(10,0,24,0.85)',
			border: '1px solid #ffcc0066',
			padding: '8px 14px',
			zIndex: 50,
			pointerEvents: 'none',
		}}>
		{'\u{1FA99}'} {tokens}
		</div>
	)
}


