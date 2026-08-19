import {CONTACT} from '../data/stats'

export default function ContactPanel({onClose}){
	return (
		<div onClick={onClose} style={overlay}>
		<div onClick={e => e.stopPropagation()} style={box}>
		<button onClick={onClose} style={closeBtn}>X</button>
		<p style={tag}>PHONE BOOTH</p>
		<h2 style={title}>CONTACT INFO</h2>

		<div style={contactRow}>
		<span style={icon}>&#9993;</span>
		<a href={`mailto:${CONTACT.email}`} style={link}>
		{CONTACT.email}
		</a>
		</div>

		<div style={contactRow}>
		<span style={icon}>&#11041;</span>
		<a href={CONTACT.github} target="_blank" rel="noreferrer" style={link}>GitHub
		</a>
		</div>

		<div style={contactRow}>
		<span style={icon}>&#9670;</span>
		<a href={CONTACT.linkedin} target="_blank" rel="noreferrer" style={link}>
		Linkedin
	</a>
		</div>

		<div style={footerBox}>
		<p style={footer}>
		Feel free to reach out!
		</p>
		</div>
		</div>
		</div>
	)
}

const px	={fontFamily: '"Press Start 2P", monospace'}
const overlay 	={position:'fixed',inset:0, background:'rgba(0,0,0,0.88)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}
const box	={background:'#0f0020', border: '2px solid #ff0044', padding: '30px 32px',maxWidth:'480px', width:'90%', position:'relative', boxShadow:'0 0 40px rgba(255,0,68,0.25)'}
const closeBtn   = { ...px, position:'absolute', top:12, right:12, background:'none', border:'1px solid #444', color:'#666', padding:'5px 9px', cursor:'pointer', fontSize:'9px' }
const tag        = { ...px, fontSize:'7px', color:'#ff0044', letterSpacing:'3px', marginBottom:'10px' }
const title      = { ...px, fontSize:'14px', color:'#ff0044', marginBottom:'28px', lineHeight:1.7 }
const contactRow = { display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #1a0030' }
const icon       = { ...px, fontSize:'14px', color:'#ff0044', width:'24px', textAlign:'center' }
const link       = { ...px, fontSize:'9px', color:'#ffcc00', textDecoration:'none', lineHeight:1.8 }
const footerBox  = { marginTop:'20px', borderTop:'1px solid #1a0030', paddingTop:'16px' }
const footer     = { ...px, fontSize:'7px', color:'#aaaacc', lineHeight:2.2 }
