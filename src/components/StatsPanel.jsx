import { SKILL_CATEGORIES, LANGUAGES } from '../data/stats'

export default function StatsPanel({onClose}){
	return (
		<div onClick={onClose} style={overlay}>
		<div onClick={e => e.stopPropagation()} style={box}>
		<button onClick={onClose} style={closeBtn}>X</button>
		{/*<p style={tag}>TERMINAL</p>*/}
		<h2 style={title}> ANA{'\u0027'}S STATS</h2>

		{/* SKILL CATEGORIES */}
		{SKILL_CATEGORIES.map(cat => (
			<div key={cat.category} style={{marginBottom: '24px' }}>
			<p style={{ ...sectionLabel, color: cat.color }}>
				{cat.category}
			</p>
			{cat.skills.map(skill=>(
				<div key={skill.name} style={skillRow}>
				<div style={skillName}>{skill.name}</div>
				<div style={track}>
				<div style={{
					...fill,
					width: skill.level + '%',
					background: cat.color,
					boxShadow: `0 0 6px ${cat.color}`,
				}} />
				</div>
				<div style={{ ...pct, color: cat.color }}>
				{skill.level}%
				</div>
				</div>
			))}
			</div>
		))}

		{/* Languages */}
		<p style={{ ...sectionLabel, color: '#00ff88' }}> LANGUAGES </p>
		{LANGUAGES.map(lang => (
			<div key={lang.name} style={skillRow}>
			<div style={skillName}>{lang.name}</div>
			<div style={track}>
			<div style={{
				...fill,
				width: lang.level + '%',
				background: '#00ff88',
				boxShadow: '0 0 6px #00ff88',
			}} />
			</div>
			<div style={{ ...pct, color: '#00ff88', }}>{lang.label}</div>
			</div>
		))}
</div>
		</div>
	)
}


const px 		= {fontFamily: '"Press Start 2P", monospace'}
const overlay 		= { position: 'fixed', inset:0, background: 'rgba(0,0,0,0.92)', display:'flex', alignItems: 'center', justifyContent: 'center', zIndex:100, padding:'20px'}
const box		= {background:'#0f0020', border: '2px solid #00ff88', padding: '28px 30px', maxWidth:'580px', width:'92%', position: 'relative', boxShadow: '0 0 40px rgba(0, 255,136,0.15)', maxHeight:'88vh', overflowY:'auto'}
const closeBtn		= { ...px, position:'absolute', top:12, right:12, background:'none', border:'1px solid #444', color: '#666', padding: '5px 9px', cursor:'pointer', fontSize: '9px' }
{/*const tag		= {...px, fontSize:'7px', color:'#00ff88', letterSpacing: '3px', marginBottom:'10px' } */}
const title		= {...px, fontSize:'13px', color:'#00ff88', marginBottom:'22px', lineHeight:1.7}
const sectionLabel 	={ ...px, fontSize: '7px', letterSpacing: '2px', marginBottom: '12px', color: '#ccccff'}
const skillRow 		= {display:'flex', alignItems:'center', gap:'10px', marginBottom: '10px'}
const skillName		={ ...px, fontSize:'6px', color:'#ccccff', width:'140px', flexShrink:0, lineHeight:1.8 }
const track 		= { flex:1, height: '6px', background: '#1a0030', border:'1px solid #2a0040'}
const fill		= {height:'100%', transition:'width 1s ease-out'}
const pct		= {...px, fontSize:'6px', width:'46px', textAlign:'right', flexShrink:0}
const contactLine 	= { ...px, fontSize: '8px', color: '#aaaacc', marginBottom: '10px'}
const contactLink 	= { ...px, fontSize:'8px', color: '#00ff88', textDecoration:'none', display:'block', marginBottom: '10px'}

