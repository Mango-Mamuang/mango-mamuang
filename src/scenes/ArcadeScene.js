import Phaser from 'phaser'
import {PROJECTS} from '../data/projects'
import {visitMachine, gameState} from '../store/gameState'

export default class ArcadeScene extends Phaser.Scene {
	constructor() {
		super('ArcadeScene')
	}

	create(){
		const W = this.scale.width
		const H = this.scale.height

		//interactable zones
		this.interactZones = []
		this.nearZone = null

		
		const count = PROJECTS.length
		const marginX=0.22
		const spacing = (1-marginX*2) / (count -1)
		const machineWalls =[]
		for (let i=0; i<count; i++){
			const x = W*(marginX + i* spacing)
			machineWalls.push({x: x-30,y: H*0.25, w: 60, h:120})
		}




		this.walls =[
			//machines - x, y width,height
		//	{ x: W*0.22 -30, y: H*0.25, w: 60, h: 120 },
		//	{ x: W*0.50 -30, y: H*0.25, w: 60, h: 120 },
		//	{ x: W*0.78 -30, y: H*0.25, w: 60, h: 120 },
			//help desk
		//	{ x: W*0.10 -45, y: H*0.58, w: 90, h: 60 },
		


			...machineWalls,
			
			//help desk
			{ x: W*0.10 -40, y: H*0.58, w: 90, h: 70 },
			//stats terminal
			{ x: W*0.90 -45, y: H*0.55, w: 80, h: 90 },
			//giftshop

			{ x: W*0.90 -70, y: H*0.97-55, w: 130, h: 80 },
			//phone booth
			{x:W*0.08-24, y: H*0.99-106, w: 59, h:90},
		]






		this.drawFloor(W,H)
		this.drawMachines(W,H)
		this.drawHelpDesk(W,H)
		this.drawStatsMachine(W,H)
		this.drawGiftShop(W,H)
		this.createPlayer(W,H)
		this.createPrompt()
		this.setupInput()
		this.drawExitDoor(W,H)
		this.drawPhoneBooth(W,H)

		this.cameras.main.fadeIn(500, 0,0,0)
	}


	drawFloor(W,H) {
		const g = this.add.graphics()

		//floor
		g.fillStyle(0x06000e)
		g.fillRect(0,0,W,H)

		//tile grid
		g.lineStyle(0.5, 0x1a0028, 0.5)
		for (let x= 0; x<W; x +=48) g.lineBetween(x,50,x,H)
		for (let y =50; y<H; y+=48) g.lineBetween(0,y,W,y)

		//ceiling strip
		g.fillStyle(0x100022)
		g.fillRect(0,0,W,50)
		g.lineStyle(1, 0xcc00ff, 0.5)
		g.lineBetween(0,50,W,50)

		//ceiling lights
		for (let lx =100; lx < W - 100; lx +=160){
			g.fillStyle(0x220033)
			g.fillRect(lx -20,6,40,18)
			g.lineStyle(1, 0xcc00ff, 0.5)
			g.strokeRect(lx - 20, 6,40,18)

			//light cone
			//g.fillStyle(0x330044,0.6)
			//g.fillRect(lx-18,24,36,6) //wide top
			//g.fillStyle(0x220033,0.4)
			//g.fillRect(lx-14,30,28,8)
			//g.fillStyle(0x1a0028,0.3)
			//g.fillRect(lx-10,38,20,8)
			//g.fillStyle(0x110022,0.2)
			///g.fillRect(lx-6,46,12,8)
			//g.fillStyle(0x080018, 0.1)
			//g.fillRect(lx-3,54,6,8)
		}

		//arcade name on ceiling
		this.add.text(W/2,25, "ANA\u0027S ARCADE", {
			fontFamily: '"Press Start 2P"',
			fontSize: '10px',
			color: '#cc00ff',
		}).setOrigin(0.5).setDepth(5)
	}

	drawMachines(W,H) {

		const count = 4;
		const marginX =0.22;
		const spacing = (1- marginX *2) / (count-1);
		const machinePositions = [];
//			{x: W*0.22, y: H*0.35},
//			{x: W*0.50, y: H*0.35},
//			{x: W*0.78, y: H*0.35}, //adjust if side panel
			for (let i =0; i<count; i++){
				machinePositions.push({x: W * (marginX+ i * spacing), y: H*0.35});
			}
		

		PROJECTS.forEach((project, index) => {
			const position =machinePositions[index];
			this.drawOneMachine(
				//machinePositions[index].x,
				//machinePositions[index].y,
				position.x,
				position.y,
				project
			)
		})
	}

	drawOneMachine(cx,cy, project) {
		const g = this.add.graphics()
		const col = project.cabinetColor
		const colHex = '#' + col.toString(16).padStart(6, '0')


		//floor shadow
		g.fillStyle(0x000000, 0.4)
		g.fillEllipse(cx, cy +65, 80,14)

		//cabinet base
		g.fillStyle(col, 0.25)
		g.fillRect(cx -22, cy+50,44,12)
		g.lineStyle(1, col, 0.6)
		g.strokeRect(cx-22,cy+50,44,12)

		//cabinet body
		g.fillStyle(0x1a0030)
		g.fillRect(cx-24,cy+12,48,40)
		g.lineStyle(2, col, 0.8)
		g.strokeRect(cx-24, cy+12, 48,40)

		//control panel (slanted part in front)
		g.fillStyle(col, 0.4)
		g.fillRect(cx-26, cy+4,52,12)
		g.lineStyle(1,col)
		g.strokeRect(cx-26,cy+4,52,12)

		//joystick
		g.fillStyle(0xdddddd)
		g.fillCircle(cx-10,cy+10,4)
		g.fillStyle(0x111111)
		g.fillCircle(cx -10,cy+8,2)

		//buttons
		g.fillStyle(0xff2222); g.fillCircle(cx+4, cy+10,3)
		g.fillStyle(0xffcc00); g.fillCircle(cx+12, cy+10,3)
		g.fillStyle(0x2222ff); g.fillCircle(cx+20, cy+10,3)

		//screen bezel (dark frame)
		g.fillStyle(0x111111)
		g.fillRect(cx-22,cy-36,44,42)
		g.fillStyle(1,col,0.5)
		g.strokeRect(cx-22, cy-36,44,42)

		//screen
		g.fillStyle(col,0.1)
		g.fillRect(cx-18,cy-32,36,34)
		g.fillStyle(0x000000,0.25)
		for (let sy =cy-32; sy<cy+2;sy+=3){
			g.fillRect(cx-18,sy,36,1)
		}

		//project label on screen
		this.add.text(cx, cy-16, project.machineLabel, {
			fontFamily: '"Press Start 2P"',
			fontSize: '5px',
			color: colHex,
			align: 'center',
		}).setOrigin(0.5).setDepth(3)

		//marquee(top part)
		g.fillStyle(col, 0.85)
		g.fillRect(cx-24,cy-56,48,20)
		g.fillStyle(1, col)
		g.strokeRect(cx-24, cy-56,48,20)
		this.add.text(cx, cy-46, '\u2605',{
			fontFamily: '"Press Start 2P"',
			fontSize: '10px',
			colorr: '#ffffff',
		}).setOrigin(0.5).setDepth(3)

		//visited checkmark (hidden by default)
		const checkmark = this.add.text(cx+24,cy-60, '',{
			fontFamily: '"Press Start 2P"',
			fontSize: '10px',
			color: '#00ff88',
		}).setOrigin(0.5).setDepth(4)

		//store zone for interaction
		this.interactZones.push({
			x: cx,
			y: cy,
			radius: 75,
			type: 'project',
			projectId: project.id,
			label: project.machineLabel.replace('\n', ' '),
			checkmark, // reference to update it
		})
	}

	drawHelpDesk(W, H) {
		const g = this.add.graphics()
		const cx = W * 0.10
		const cy = H * 0.65

		//desk
		g.fillStyle(0x1a0035)
		g.fillRect(cx -40, cy+10,80,24)
		g.lineStyle(2, 0x00ffcc)
		g.strokeRect(cx-40,cy+10,80,24)

		//NPC body
		g.fillStyle(0x00ffcc, 0.7)
		g.fillRect(cx -10, cy-8,20,18)


		//NPC head
		g.fillStyle(0xffddaa)
		g.fillRect(cx -8, cy-26,16,18)
		g.lineStyle(1,0xcc8844)
		g.strokeRect(cx - 8, cy -26,16,18)

		// icon: ?
		this.add.text(cx +14,cy-30, '?', {
			fontFamily: '"Press Start 2P"',
			fontSize: '11px',
			color: '#00ffcc',
		}).setOrigin(0.5).setDepth(4)

		//label
		this.add.text(cx,cy+22, 'HELP\nDESK', {
			fontFamily: '"Press Start 2P"',
			fontSize: '6px',
			color: '#00ffcc',
			align: 'center',
		}).setOrigin(0.5).setDepth(4)


		this.interactZones.push({
			x: cx,
			y:cy,
			radius: 70, 
			type: 'help',
			label: 'HELP DESK',
		})
	}

	drawStatsMachine(W,H){
	//stats screen. looks like computer terminal on right wall
	const g = this.add.graphics()
	const cx = W * 0.90
	const cy = H * 0.65

	//terminal body 
	g.fillStyle(0x001a10)
	g.fillRect(cx -36, cy-40,72,80)
	g.lineStyle(2, 0x00ff88)
	g.strokeRect(cx-36,cy-40,72,80)

	//screen
	g.fillStyle(0x001a08)
	g.fillRect(cx-28,cy-32,56,44)
	g.lineStyle(1, 0x00ff88, 0.5)
	g.strokeRect(cx-28,cy-32,56,44)

	//blinking cursor on screen
	const cursor = this.add.text(cx- 20, cy-14, '>STATS', {
		fontFamily: '"Press Start 2P"',
		fontSize: '7px',
		color: '#00ff88',
	
	}).setDepth(4)
	this.tweens.add({
		targets: cursor,
		alpha: 0,
		duration: 500,
		yoyo: true,
		repeat: -1,
	})

	//label
//	this.add.text(cx,cy+50, 'ANA\u0027S STATS', {
//		fontFamily: '"Press Start 2P"',
//		fontSize: '8px',
//		color: '#00ff88',
//		align: 'center',
//	}).setOrigin(0.5).setDepth(4)

	this.interactZones.push({
		x: cx,
		y: cy,
		radius: 75,
		type: 'stats',
		label: 'STATS',
	})
}

drawGiftShop(W,H) {
	const g = this.add.graphics()
	const cx = W * 0.90 //left/right
	const cy = H * 0.97 //0.88 //up/down

	//shelf behind npc
	g.fillStyle(0x1a0010)
	g.fillRect(cx-60,cy-40,120,60)
	g.lineStyle(2, 0xff6600)
	g.strokeRect(cx-60,cy-40,120,60)

	//shelf planks
	g.fillStyle(1,0xff6600, 0.3)
	g.fillRect(cx -55,cy-30,110,8)
	g.fillRect(cx-55, cy-10,110,8)

	//items on shelf(small boxes)
	g.fillStyle(0xffcc00, 0.6); g.fillRect(cx-45,cy-40,12,12)
	g.fillStyle(0x00ffcc, 0.6); g.fillRect(cx-25,cy-40,12,12)
	g.fillStyle(0xcc00ff, 0.6); g.fillRect(cx-5,cy-40,12,12)
	g.fillStyle(0xff6600, 0.6); g.fillRect(cx+15,cy-40,12,12)

	//desk
	g.fillStyle(0x2a0015)
	g.fillRect(cx-40,cy+10,80,24)
	g.lineStyle(2,0xff6600)
	g.strokeRect(cx-40,cy+10,80,24)

	//NPC body
	g.fillStyle(0xff6600,0.7)
	g.fillRect(cx-10,cy-8,20,18)

	//NPC head
	g.fillStyle(0xffddaa)
	g.fillRect(cx-8,cy-26,16,18)
	g.lineStyle(1,0xcc8844)
	g.strokeRect(cx-8,cy-26,16,18)

	//gift icon above NPC
	this.add.text(cx+14,cy-30, '\u{1F381}',{
		fontSize: '14px',
	}).setOrigin(0.5).setDepth(4)
	
	//sign
	//const sign = this.add.text(cx, cy -80, 'GIFT SHOP', {
	//	fontFamily: '"Press Start 2P"',
	//	fontSize: '7px',
	//	color: '#ff6600',
	//}).setOrigin(0.5).setDepth(4)


	//this.tweens.add({
	//	targets: sign,
	//	alpha: 0.2,
	//	duration: 800,
	//	yoyo: true,
	//	repeat: -1, 
	//})

	//token cost hint
	//this.add.text(cx, cy-94, 'spend tokens here', {
	///	fontFamily: '"Press Start 2P"',
	//	fontSize: '5px',
	//	color: '#ffcc0066',
	//}).setOrigin(0.5).setDepth(4)

	this.interactZones.push({
		x: cx,
		y: cy,
		radius: 70,
		type: 'shop',
		label: 'GIFT SHOP',
	})
}

drawPhoneBooth(W,H){
	const g =this.add.graphics()
	const cx= W*0.08
	const cy=H*0.99

	const neon= 0xff10f0
	const neonHex= '#ff10f0'

	//outer glow layers
	g.lineStyle(6, neon,0.12)
	g.strokeRect(cx-22, cy-70,44,72)
	g.lineStyle(3,neon, 0.25)
	g.strokeRect(cx-22, cy-70,44,72)


	//roof outer glow
	g.lineStyle(5, neon, 0.12)
	g.strokeRect(cx-24,cy-82,48,14)
	g.lineStyle(2.5, neon, 0.25)
	g.strokeRect(cx-24, cy-82,48,14)

	//booth base
	g.fillStyle(neon, 0.15)
	g.fillRect(cx-22,cy-70,44,72)

	//booth roof
	g.fillStyle(neon, 0.2)
	g.fillRect(cx-24,cy-82,48,14)

	
	//roof ridge
	g.fillStyle(neon, 0.35)
	g.fillRect(cx-20, cy-88,40,8)

	//neon outline glow
	g.lineStyle(2, neon,1)
	g.strokeRect(cx-22, cy-70,44,72)
	g.lineStyle(1, neon, 0.6)
	g.strokeRect(cx-24,cy-82,48,14)

	//glass panels
	g.fillStyle(0x001122)
	g.fillRect(cx-16,cy-64,14,24)
	g.fillRect(cx+2, cy-64,14,24)
	g.fillRect(cx-16, cy-36,14,24)
	g.fillRect(cx+2, cy-36,14,24)

	//window neon tint
	g.fillStyle(2, neon, 1)
	g.fillRect(cx - 16, cy - 64, 14, 24)
  	g.fillRect(cx + 2,  cy - 64, 14, 24)
  	g.fillRect(cx - 16, cy - 36, 14, 24)
  	g.fillRect(cx + 2,  cy - 36, 14, 24)

  	// Window frames
  	g.lineStyle(2, neon, 1)
  	g.strokeRect(cx - 16, cy - 64, 14, 24)
  	g.strokeRect(cx + 2,  cy - 64, 14, 24)
  	g.strokeRect(cx - 16, cy - 36, 14, 24)
  	g.strokeRect(cx + 2,  cy - 36, 14, 24)

  	// Door outline
 	//g.lineStyle(1, 0xff0044, 0.3)
  	//g.strokeRect(cx - 8, cy - 16, 16, 18)

  	// Handle
  	//g.fillStyle(0xffcc00)
  	//g.fillCircle(cx + 4, cy - 8, 2)

  	//Neon sign on top
  	const sign = this.add.text(cx, cy - 96, 'MORE INFO', {
    	fontFamily: '"Press Start 2P"',
    fontSize: '8px',
    color: neonHex,
  }).setOrigin(0.5).setDepth(4)

  this.tweens.add({
    targets: sign,
    alpha: 0.2,
    duration: 600,
    yoyo: true,
    repeat: -1,
  })

  // Neon glow underneath sign
  //this.add.text(cx, cy - 106, '[ PHONE ]', {
    //fontFamily: '"Press Start 2P"',
    //fontSize: '4px',
    //color: '#ff004466',
  //}).setOrigin(0.5).setDepth(4)

  // Wall obstacle
  //this.walls.push(
   // { x: cx - 24, y: cy - 88, w: 48, h: 90 }
 // )

  // Interact zone
  this.interactZones.push({
    x: cx,
    y: cy - 30,
    radius: 65,
    type: 'contact',
    label: 'PHONE BOOTH',
  })
}


drawExitDoor(W,H) {
	const g = this.add.graphics()
	const cx = W *0.50
	const cy = H*0.97

	//exit door
	g.fillStyle(0x0a0018)
	g.fillRect(cx-30,cy-50,60,52)
	g.lineStyle(2, 0xcc00ff, 0.9)
	g.strokeRect(cx-30, cy-50,60,52)

	//exit sign
	this.add.text(cx,cy-60, 'EXIT', {
		fontFamily: '"Press Start 2P"',
		fontSize: '7px',
		color: '#cc00ff',
	}).setOrigin(0.5).setDepth(4)

	//interact zone
	this.interactZones.push({
		x: cx,
		y: cy -25,
		radius: 60,
		type: 'exit',
		label: 'EXIT',
	})
}

createPlayer(W,H) {
	this.player = {x: W/2, y: H *0.75}
	this.playerGraphic = this.add.graphics()
	this.redrawPlayer()

	//token display above player
	this.tokenLabel = this.add.text(0,0, '\u{1FA99}, 0', {
		fontFamily: '"Press Start 2P"',
		fontSize: '7px',
		color: '#ffcc00',
	}).setOrigin(0.5).setDepth(25)
}



redrawPlayer(){
	const g = this.playerGraphic
	const { x,y} = this.player
	g.clear()

	g.fillStyle(0x000000, 0.3)
	g.fillEllipse(x,y+16,24,7)
	
	g.fillStyle(0xcc00ff)
	g.fillRect(x-10, y-6, 20,20)
	g.fillStyle(1, 0xff44ff) 
	g.strokeRect(x-10,y-6,20,20)

	g.fillStyle(0xffddaa)
	g.fillRect(x-8,y-22,16,16)
	
	g.fillStyle(0x553300)
	g.fillRect(x-8,y-22,16,5)

	g.fillStyle(0x220000)
	g.fillRect(x-5,y-17,3,3)
	g.fillRect(x+2, y-17,3,3)
	
	g.setDepth(20)
}

createPrompt(){
	this.prompt = this.add.text(0,0, '', {

		fontFamily: '"Press Start 2P"',
		fontSize: '7px',
		color: '#ffcc00',
		backgroundColor: '#0a0018',
		padding: {x: 6, y:4},
	}).setOrigin(0.5).setDepth(30).setVisible(false)
}

setupInput(){
	this.cursors = this.input.keyboard.createCursorKeys()
	this.wasd = this.input.keyboard.addKeys({
		up: Phaser.Input.Keyboard.KeyCodes.W,
		down: Phaser.Input.Keyboard.KeyCodes.S,
		left: Phaser.Input.Keyboard.KeyCodes.A,
		right: Phaser.Input.Keyboard.KeyCodes.D,
	})
	this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
}

update(){
	const speed = 3
	const W = this.scale.width
	const H = this.scale.height

	//store prev pos
	const prevX = this.player.x
	const prevY = this.player.y

	//movt

	if (this.cursors.left.isDown || this.wasd.left.isDown)
		this.player.x = Math.max(30, this.player.x -speed)
	if (this.cursors.right.isDown || this.wasd.right.isDown)
		this.player.x = Math.min(W-30, this.player.x + speed)
	if (this.cursors.up.isDown || this.wasd.up.isDown)
		this.player.y = Math.max(70, this.player.y -speed)
	if (this.cursors.down.isDown || this.wasd.down.isDown)
		this.player.y = Math.min(H -20, this.player.y + speed)


	//check for wall collisions
	for (const wall of this.walls) {
		if (
			this.player.x > wall.x &&
			this.player.x < wall.x + wall.w &&
			this.player.y > wall.y &&
			this.player.y < wall.y + wall.h
		){
			this.player.x = prevX
			this.player.y = prevY
		}
	}

	this.redrawPlayer()

	//update token display position
	this.tokenLabel
	.setPosition(this.player.x, this.player.y-42)
	.setText('\u{1FA99}' + gameState.tokens)

	//find nearest interactable zone
	this.nearZone = null
	for (const zone of this.interactZones){
		const dist = Phaser.Math.Distance.Between(
			this.player.x, this.player.y, zone.x, zone.y
		)
		if(dist<zone.radius){
			this.nearZone = zone
			break
		}
	}

	//show or hide prompt
	if(this.nearZone){
		this.prompt
		.setText('[E] ' + this.nearZone.label)
		.setPosition(this.player.x, this.player.y -56)
		.setVisible(true)
	}else{
		this.prompt.setVisible(false).setText('')
	}

	if (Phaser.Input.Keyboard.JustDown(this.eKey) && this.nearZone){
		this.handleInteract(this.nearZone)
	}
}

	handleInteract(zone){

		if (zone.type ==='exit'){
			this.cameras.main.fadeOut(500, 0,0,0)
			this.cameras.main.once('camerafadeoutcomplete', () => {
				this.scene.start('EntranceScene')
			})
		}

		if(zone.type === 'project'){
			const earned = visitMachine(zone.projectId)
			//mark machine as visited w checkmark
			if (earned > 0 && zone.checkmark) {
			}
			//tell react to open modal
			window.dispatchEvent(new CustomEvent('openProject', {
				detail: {projectId: zone.projectId }
			}))
		}

		if(zone.type === 'help') {
			window.dispatchEvent(new CustomEvent('openHelp'))
		}
		if (zone.type === 'stats') {
			window.dispatchEvent(new CustomEvent('openStats'))
		}
		if (zone.type === 'shop') {
			window.dispatchEvent(new CustomEvent('openShop'))
		}
		if (zone.type ==='contact'){
			window.dispatchEvent(new CustomEvent('openContact'))
		}
	}
}

