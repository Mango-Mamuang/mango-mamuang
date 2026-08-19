import {useEffect, useRef, useState} from 'react'
import Phaser from 'phaser'
import EntranceScene from '../scenes/EntranceScene'
import ArcadeScene from '../scenes/ArcadeScene'
import {PROJECTS} from '../data/projects'
import ProjectModal from './ProjectModal'
import StatsPanel from './StatsPanel'
import HelpPanel from './HelpPanel'
import GiftShop from './GiftShop'
import TokenHUD from './TokenHUD'
import ContactPanel from './ContactPanel'

export default function GameView() {
	const containerRef = useRef(null)
	const [tokens, setTokens] =useState(0)
	const [panel, setPanel] = useState(null) //which panel is open
	const [activeProject, setActiveProject] = useState(null)


	useEffect(() => {
		//Creates phaser game.
		const game = new Phaser.Game({
			type: Phaser.AUTO,
			parent: containerRef.current,
			width: 1280,//window.innerWidth,
			height: 720,//window.innerHeight,
			backgroundColor: '#0a0a0f',
			physics: {
				default: 'arcade',
				arcade: {gravity: {y: 0}, debug: false }
			},
			scale: {
				mode: Phaser.Scale.FIT, //AUTO RESIZE
				autoCenter: Phaser.Scale.CENTER_BOTH, //AUTO CENTER
				width: '100%',
				height: '100%',
			},
			scene: [EntranceScene, ArcadeScene],
		})


		//Listen for events phaser fires
		const onProject = (e) => {
			setActiveProject(PROJECTS.find(p => p.id === e.detail.projectId))
			setPanel('project')
		}
		const onHelp	= () => setPanel('help')
		const onStats	= () => setPanel('stats')
		const onShop	= () => setPanel('shop')
		const onTokens	= (e) => setTokens(e.detail.tokens)
		const onKeyDown = (e) => {
			if(e.key === 'Escape'){
				setPanel(null)
				setActiveProject(null)
			}
		}

		const onContact	= () => setPanel('contact')
		

		window.addEventListener('openProject', onProject)
		window.addEventListener('openHelp', onHelp)
		window.addEventListener('openStats', onStats)
		window.addEventListener('openShop', onShop)
		window.addEventListener('tokenUpdate', onTokens)	
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('openContact', onContact)




		//Clean up when component unmounts
		return () => {
			game.destroy(true)

			
			window.removeEventListener('openProject', onProject)
			window.removeEventListener('openHelp', onHelp)
			window.removeEventListener('openStats', onStats)
			window.removeEventListener('openShop', onShop)
			window.removeEventListener('tokenUpdate', onTokens)
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('openContact', onContact)

		}
	},[])

	function closePanel() {
		setPanel(null)
		setActiveProject(null)
	}

	return (
		<div style = {{width: '100vw', height: '100vh', position: 'relative'}}>

		{ /* phaser canvas */}
		<div ref={containerRef} style={{width: '100%', height: '100%' }}/>

		{/*token counter */}
		<TokenHUD tokens={tokens} />

		{/* panels */}
		{panel === 'project' && activeProject && (
			<ProjectModal project={activeProject} onClose={closePanel} />
		)}
		{panel === 'help' && <HelpPanel onClose={closePanel} />}
		
		{panel === 'stats' && <StatsPanel onClose={closePanel} />}

		{panel === 'shop' && <GiftShop onClose={closePanel} />}

		{panel === 'contact' && <ContactPanel onClose={closePanel} />}

	</div>
	)
}

