import {useState} from 'react'
import TitleScreen from './components/TitleScreen'
import GameView from './components/GameView'


export default function App() { 
	const [screen, setScreen] = useState('title')

	function handleStart(){
		setScreen('game')
	}

	function handleResume() {
		//open resume
		window.open('/resume.pdf', 'http://mango-mamuang.github.io/public/resume.pdf')
	}
	return ( 
		<>
		{screen ==='title' && (
			<TitleScreen
			onStart={handleStart}
			onResume={handleResume}
			/>
	)}
	{screen === 'game' && (
		<GameView />
	)}
	</>
)
		}
