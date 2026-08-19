//data restarts on refresh
export const gameState = { 
	tokens: 0,
	visitedMachines: new Set(), 
	ownedGifts: [],
}

//add tokens
export function addTokens(amount) {
	gameState.tokens += amount
	//fire browser event so React knows to update counter
	window.dispatchEvent(
		new CustomEvent('tokenUpdate', { detail: {tokens: gameState.tokens } } )
	)
}
//returns amt of tokens earned 
export function visitMachine(machineId) {
	if (gameState.visitedMachines.has(machineId)) {
		return 0 //already visited machine
	}
	gameState.visitedMachines.add(machineId)
		addTokens(1)
		return 1
}
//returns true if purchase succeeds
export function buyGift(giftId, cost) {
	if (gameState.tokens < cost) return false
	if (gameState.ownedGifts.includes(giftId)) return false
	gameState.tokens -= cost
	gameState.ownedGifts.push(giftId)
	window.dispatchEvent(
		new CustomEvent('tokenUpdate', {detail: {tokens: gameState.tokens }})
	)
	return true
}
