const CONTROLS =[
	{key: 'W A S D', action: 'Move your player' },
	{key: '↑ ↓ ← →', action: 'Also moves player'},
	{key: 'E',	action: 'Interact with machines and NPCs'},
	{key: 'ESC',	action: 'Close open panel'},
]

export default function HelpPanel({ onClose}) {
	return (
		<div onClick={onClose} style={overlay}>
		<div onClick={e =>e.stopPropagation()} style={box}>
		<button onClick={onClose} style={closeBtn}>X</button>
		<p style ={tag}> HELP DESK </p>
		<h2 style = {title}>HOW TO PLAY </h2>
		{CONTROLS.map(c => (
			<div key={c.key} style={row}>
			<span style={keyStyle}>{c.key}</span>
			<span style={actionStyle}>{c.action}</span>
			</div>
		))}
		<div style={tipBox}>
		<p style={tip} > Walk up to an arcade machine and press E to view a project</p>
		<p style={tip}> First visit earns you a token. You can spend them at the Gift Shop! </p>
		<p style={tip}> Check out my skills at the terminal on the right!</p>
		</div>
		</div>
		</div>
	)
}
const px = {fontFamily: '"Press Start 2P", monospace'}
const overlay = {position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', display:'flex', alignItems: 'center', justifyContent:'center', zIndex:100}
const box = { background: '#0f0020', border: '2px solid #00ffcc', padding: '30px 32px', maxWidth: '500px', width: '90%', position: 'relative', boxShadow: '0 0 40px rgba(0,255,204,0.2)'}
const closeBtn ={...px, position: 'absolute', top:12, right:12, background: 'none', border: '1px solid #444', color: '#666', padding: '5px 9px', cursor: 'pointer', fontSize: '9px'}
const tag ={...px, fontSize:'7px', color: '#00ffcc', letterSpacing: '3px', marginBottom: '10px'}
const title ={...px, fontSize:'14px', color: '#00ffcc', marginBottom: '22px', lineHeight:1.7}
const row ={display:'flex', alignItems:'center', gap: '16px', marginBottom: '14px', paddingBottom:'14px', borderBottom: '1px solid #1a0030'}
const keyStyle= {...px, fontSize: '8px', background:'#1a0030', border: '1px solid #00ffcc44', color: '#00ffcc', padding:'6px 12px', minWidth:'110px', textAlign:'center'}
const actionStyle ={ ...px, fontSize:'8px', color:'#aaaacc', lineHeight:1.8}
const tipBox = {marginTop: '20px', borderTop: '1px solid #1a0030', paddingTop: '16px'}
const tip ={ ...px, fontSize:'7px', color: '#ffcc00', lineHeight: 2.5}
