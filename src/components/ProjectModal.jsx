export default function ProjectModal({project, onClose}) {
	const col = '#' + project.cabinetColor.toString(16).padStart(6, '0')

	return (
		<div onClick={onClose} style={styles.overlay}>
		<div onClick={e=> e.stopPropagation()} style={{
			...styles.box,
				border: '2px solid ${col}',
				boxShadow: '0 0 40px ${col}44',
		}}>
		<button onClick={onClose} style={styles.closeBtn}>X</button>
		<p style={{...styles.tag, color: col}}>PROJECT</p>
		<h2 style={{...styles.title, color: col}}>{project.title}</h2>
		<p style = {styles.desc}>{project.description}</p> 
		<div style={styles.stackRow}>
		{project.techStack.map(tech => (
			<span key ={tech} style={{ ...styles.pill, border: '1px solid ${col}', color: col}}>
			{tech}
			</span>
		))}
		</div>
		<div style={styles.linkRow}>
		<a href={project.githubLink} target="_blank" rel="noreferrer" style={styles.link}>
		GITHUB
		</a>
		{project.liveLink && (
		<a href={project.liveLink} target="_blank" rel="noreferrer" style={styles.link}>
		REPORT
		</a> 
		)}
		</div>{/* report link */}

		</div>
		</div>
	)
}
const pxFont = {fontFamily: '"Press Start 2P", monospace' }
const styles = {
	overlay: {position:'fixed', inset:0, background: 'rgba(0,0,0,0.88)', display:'flex', alignItems:'center', justifyContent: 'center', zIndex:100},
	box:{background: '#0f0020', padding:'30px 32px', maxWidth:'500px', width:'90%', position: 'relative'},
	closeBtn: {...pxFont, position: 'absolute', top:12, right: 12, background:'none', border: '1px solid #444', color: '#666', padding: '5px 9px', cursor: 'pointer', fontSize: '9px'},
	tag: {...pxFont, fontSize: '7px', letterSpacing: '3px', marginBottom:'10px'},
	title: {...pxFont, fontSize: '14px', marginBottom: '14px', lineHeight:1.7},
	desc: {...pxFont, fontSize:'9px', color: '#FFFFFF', lineHeight:2, marginBottom:'18px'},
	stackRow: {display:'flex', flexWrap: 'wrap', gap: '8px', marginBottom:'22px'},
	pill: {...pxFont, fontSize: '7px', padding: '5px 10px'},
	linkRow: {display: 'flex', gap: '12px'},
	link: {...pxFont, fontSize: '8px', border: '2px solid #ffcc00', color:'#ffcc00', padding: '10px 16px', textDecoration: 'none'},
}

