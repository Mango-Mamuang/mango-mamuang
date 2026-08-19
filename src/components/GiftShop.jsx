import {useState} from 'react'
import {GIFTS} from '../data/gifts'
import {gameState, buyGift} from '../store/gameState'

export default function GiftShop({onClose}) {
	const [tokens, setTokens] = useState(gameState.tokens)
	const [owned, setOwned] = useState([...gameState.ownedGifts])
	const [message, setMessage] =useState('')

	function handleBUy(gift) {
		const success = buyGift(gift.id, gift.tokenCost)
		if (success) {
			setTokens(gameState.tokens)
			setOwned([...gameState.ownedGifts])
			setMessage('You got: ${gift.emoji} $gift.name}!')
			setTimeout(()=> setMessage(''),2500)
		}else if (gameState.tokens < gift.tokenCost){
			setMessage('Not enough tokens! Check more machines.')
			setTimeout(()=> setMessage(''),2500)
		}
	}
	return (
		<div onClick={onClose} style={overlay}>
		<div onClick={e=> e.stopPropagation()} style={box}>
		<button onClick={onClose} style={closeBtn}>X</button>
		<p style ={tag}>GIFT SHOP</p>
		<h2 style={title}>SPEND YOUR TOKENS</h2>
		<p style = {balance}>{'\u{1FA99}'} {tokens} tokens available</p>

		{message && <p style={msg}>{message}</p>}

		<div style={grid}>
		{GIFTS.map(gift => {
			const isOwned = owned.includes(gift.id)
			const canAfford = tokens>= gift.tokenCost
			return(
				<div key={gift.id} style={{
					...card,
						border: `1px solid ${isOwned ? '#333' : canAfford ? '#ff6600' : '#330011'}`,
						opacity: isOwned ? 0.6 : 1,
				}}>
				<span style={{ fontSize: '28px'}}>{gift.emoji}</span>
				<p style ={itemName}>{gift.name}</p>
				<p style={itemDesc}>{gift.description}</p>
				{isOwned ? (
					<p style={ownedLabel}> OWNED</p>
				) : (
					<button
					onClick={() => handleBuy(gift)}
					style={{
						...buyBtn,
							color: canAfford ? '#ff6600' : '#550000',
							border: `1px solid ${canAfford ? '#ff6600' : '#330000'}`,
							cursor: canAfford ? 'pointer' : 'not-allowed',
					}}
					>
					{'\u{1FA99}'} {gift.tokenCost}
					</button>
				)}
				</div>
			)
		})}
		</div>

		{owned.length > 0 && (
			<p style ={collection}>
			YOUR COLLECTION: {owned.map(id=> GIFTS.fid(g=> g.id ===id)?.emoji).join(' ')}
			</p>
		)}
		</div>
		</div>
	)
}
const px	= {fontFamily: '"Press Start 2P", monospace'}
const overlay	={ position:'fixed', inset:0, background: 'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}
const box 	= {background:'#0f0020', border:'2px solid #ff6600', padding:'28px 30px', maxWidth:'540px', width:'92%', position: 'relative', boxShadow: '0 0 40px rbga(255,102,0,0.2)'}
const closeBtn	={...px, position:'absolute', top:12, right:12, background: 'none', border: '1px solid #444', color: '#666', padding: '5px 9px', cursor: 'pointer', fontSize:'9px'}
const tag	={...px, fontSize:'7px', color: '#ff6600', letterSpacing:'3px', marginBottom: '10px'}
const title	={...px, fontSize:'13px', color:'#ff6600', marginBottom:'10px', lineHeight:1.7 }
const balance	={...px, fontSize:'9px', color: '#ffcc00', marginBottom: '18px'}
const msg	={...px, fontSize:'8px', color:'#00ffcc', marginBottom:'14px', lineHeight:1.8}
const grid	={display: 'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'12px', marginBottom: '20px'}
const card	={background:'#120022', padding: '16px 12px', textAlign: 'center', display:'flex', flexDirection:'column', alignItems: 'center', gap: '8px'}
const itemName	={...px, fontSize:'7px', color: '#ffffff', lineHeight: 1.7}
const itemDesc	={...px, fontSize:'6px', color:'#888', lineHeight:1.8}
const buyBtn	={...px, fontSize:'8px', background:'none', padding:'7px 14px', cursor: 'pointer'}
const ownedLabel={...px, fontSize:'7px', color:'#00ff88'}
const collection={...px, fontSize:'8px', color:'#aaa', textAlign:'center', borderTop:'1px solid #1a0030', paddingTop:'16px'}

