import Phaser from 'phaser'


export default class EntranceScene extends Phaser.Scene {
	constructor(){
		super('EntranceScene')
	}

	create() {
		const W = this.scale.width
		const H = this.scale.height

		
		//greeting according to time
		const hour = new Date().getHours()
		if (hour >=6 && hour <12) { 
			this.timeOfDay = 'morning' }
		else if (hour >= 12 && hour <17){
			this.timeOfDay = 'afternoon' }
		else if (hour >= 17 && hour <20) {
			this.timeOfDay = 'evening' }
		else	{
			this.timeOfDay = 'night' }


		const skyColors ={
			morning: 	{sky: 0x1a0a2e, stars: false, sunColor: 0xff9944},
			afternoon: 	{sky: 0x1a3a6e, stars: false, sunColor: 0xffee88},
			evening: 	{sky: 0x2a0a1e, stars: true, sunColor: 0xff4422},
			night: 		{sky: 0x05000f, stars: true, sunColor: null},
		}
		this.timeConfig = skyColors[this.timeOfDay]


		//rainnnn
		this.isRaining = ( 
			this.timeOfDay === 'night' || this.timeOfDay === 'evening' || this.timeOfDay === 'morning' || this.timeOfDay === 'afternoon'
		) && Math.random() < 0.9 //90% chance of rain bc why nottt


		this.drawBackground(W, H)
		this.drawBuilding(W, H)
		this.drawDoor(W, H)
		this.createPlayer(W, H)
		this.setupInput()
		this.createPrompt()

		if (this.isRaining) {
			this.startRain(W, H)
			this.startSplashes(W, H)
		}

		this.cameras.main.fadeIn(600, 0,0,0)
	}
	
	drawBackground(W,H){
		const g = this.add.graphics()
		const {sky, stars, sunColor } = this.timeConfig

		g.fillStyle(sky)
		g.fillRect(0,0,W,H)

		if (stars) {
			g.fillStyle(0xffffff, 0.8)
		for (let i = 0; i <100; i++){
			const x = Phaser.Math.Between(0,W)
			const y = Phaser.Math.Between(0,H *0.6)
			const size = Math.random() > 0.8 ? 2:1
			g.fillRect(x, y, size, size)
		}
		}

		if (sunColor) {
			g.fillStyle(sunColor)
			g.fillCircle(W * 0.75, H * 0.2,28)
			g.fillStyle(sunColor, 0.15)
			g.fillCircle(W * 0.75 + 10, H *0.2-6, 18)
		}

		g.fillStyle(0x0d0018)
		g.fillRect(0, H * 0.70, W, H * 0.30)

		g.lineStyle(0.5, 0x1a0030, 0.4)
		for (let x = 0; x < W; x+=80){
			g.lineBetween(x, H *0.70, x, H)
		}
		for (let y = H *0.70; y<H; y+= 40){
			g.lineBetween(0, y,W, y)
		}
	}

	drawBuilding(W,H){
		const g = this.add.graphics()

		const bW=380
		const bH=280
		const bX = W/2 -bW/2
		const bY = H * 0.70-bH

		g.fillStyle(0x120020)
		g.fillRect(bX,bY,bW,bH)

		g.lineStyle(3, 0xcc00ff, 0.9)
		g.strokeRect(bX, bY, bW,bH)

		g.fillStyle(0x1a0035)
		g.fillRect(bX-14,bY -18,bW+28,20)
		g.lineStyle(2,0xcc00ff,0.6)
		g.strokeRect(bX-14,bY-18,bW+28,20)
		
		g.fillStyle(0x0a0018)
		g.fillRect(bX+50,bY+18,bW-100,64)

		this.add.text(W/2,bY+50, "ANA'S ARCADE", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ffcc00',
			stroke: '#ff6600',
			strokeThickness: 3,
		}).setOrigin(0.5)

		const windowPositions =[
			[bX+20, bY+100], //LEFT Q2
			[bX+20, bY+160], //LEFT Q3
			[bX+80, bY+160], //LEFT Q4
			[bX+bW-50, bY+100], //RIGHT Q1 
			[bX+bW-50, bY+160], //RIGHT Q4
			[bX+80, bY+100], //LEFT Q1
			[bX+bW-110, bY+100], //RIGHT Q2
			[bX+bW-110, bY+160], //RIGHT Q3
			
		]

		windowPositions.forEach(([wx,wy]) => {
			g.fillStyle(0x1a0030)
			g.fillRect(wx,wy,30,36)
			g.lineStyle(1,0x440066)
			g.strokeRect(wx,wy,30,36)
			g.fillStyle(0xcc00ff, 0.08)
			g.fillRect(wx+2,wy+2,26,32)
		})

		this.buildingY =bY
		this.buildingH =bH
	}

	drawDoor(W,H){
		const g = this.add.graphics()

		const dW=68
		const dH=100
		const dX=W/2-dW/2
		const dY= H *0.70 - dH


		g.fillStyle(0x0a0018)
		g.fillRect(dX,dY,dW,dH)
		g.lineStyle(2, 0x00ffcc)
		g.strokeRect(dX,dY,dW,dH)

		g.lineStyle(1, 0x00ffcc,0.3)
		g.strokeRect(dX+6,dY+6,dW-12,dH/2-4)
		g.strokeRect(dX+6,dY+dH/2+2,dW-12,dH/2-8)

		g.fillStyle(0xffcc00)
		g.fillCircle(dX+dW-12,dY+dH*0.55,4)

		this.openSign =this.add.text(W/2,dY-22,'\u2726 OPEN \u2726', {

			fontFamilyy: '"Press Start 2P"',
			fontSize: '11px',
			color: '#00ffcc',
		}).setOrigin(0.5)

		this.tweens.add({
			targets: this.openSign,
			alpha: 0,
			duration: 600,
			yoyo: true,
			repeat:-1,
		})

		this.doorX=W/2
		this.doorY = dY+dH/2
	}

	createPlayer(W,H) {
		this.player= {
			x: W/2,
			y: H*0.88,
		}

		this.playerGraphic = this.add.graphics()
		this.redrawPlayer()
	}

	redrawPlayer(){
		const g =this.playerGraphic
		const {x,y}=this.player

		g.clear()

		g.fillStyle(0x000000, 0.3)
		g.fillEllipse(x,y+16,24,7)
		
		g.fillStyle(0xcc00ff)
		g.fillRect(x-10,y-6,20,20)
		g.lineStyle(1,0xff44ff)
		g.strokeRect(x-10,y-6,20,20)

		g.fillStyle(0xffddaa)
		g.fillRect(x-8,y-22,16,16)

		g.fillStyle(0x553300)
		g.fillRect(x-8,y-22,16,5)

		g.fillStyle(0x220000)
		g.fillRect(x-5,y-17,3,3)
		g.fillRect(x+2,y-17,3,3)

		g.setDepth(10)
	}

	createPrompt(){
		this.enterPrompt = this.add.text(0,0, '[E] ENTER',{
			fontFamily: '"Press Start 2P"',
			fontSize: '8px',
			color: '#ffcc00',
			backgroundColor: '#0a0018',
			padding: {x:8, y:5},
		}).setOrigin(0.5).setDepth(20).setVisible(false)
	}

	setupInput(){
		this.cursors = this.input.keyboard.createCursorKeys()
		this.wasd =this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		})
		this.eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
	}

	startRain(W,H){
		const dropGraphic=this.make.graphics({x:0,y:0,add: false})
		dropGraphic.fillStyle(0x8888ff,0.6)
		dropGraphic.fillRect(0,0,1,8)
		dropGraphic.generateTexture('raindrop',1,8)
		dropGraphic.destroy()


		this.rainEmitter = this.add.particles(0,0,'raindrop', {
			x:{min:0, max: W},
			y:-10,
			speedY: {min: 300,max: 500},
			speedX: {min:-30, max:-10},
			lifespan:2000,
			quantity: 3,
			scale: {min: 0.8, max: 1.2},
			alpha: {start: 0.6, end: 0 },
			blendMode: 'ADD',
		})
		this.rainEmitter.setDepth(15)
	}
	startSplashes(W,H) {
		const splashGraphic = this.make.graphics({x:0,y:0,add:false})
		splashGraphic.fillStyle(0x8888ff,0.4)
		splashGraphic.fillEllipse(0,0,6,2)
		splashGraphic.generateTexture('splash', 6,2)
		splashGraphic.destroy()


		this.splashEmitter=this.add.particles(0,0,'splash',{
			x: {min: 0, max: W},
			y: H*0.70,
			speedY:{min:-40,max:-10},
			speedX: {min:-20,max:20},
			lifespan: 400,
			quantity: 1,
			scale: {start:0.8, end: 0},
			alpha: {start:0.5, end: 0},
		})
		this.splashEmitter.setDepth(14)
	}

	update(){
		const speed = 3
		const W = this.scale.width
		const H = this.scale.height

		if(this.cursors.left.isDown || this.wasd.left.isDown)
			this.player.x=Math.max(20, this.player.x-speed)
		if(this.cursors.right.isDown || this.wasd.right.isDown)
			this.player.x=Math.min(W-20,this.player.x+ speed)
		if(this.cursors.up.isDown || this.wasd.up.isDown)
			this.player.y=Math.max(H *0.68,this.player.y -speed)
		if (this.cursors.down.isDown || this.wasd.down.isDown)
			this.player.y = Math.min(H-20, this.player.y+speed)

		this.redrawPlayer()


		const dist = Phaser.Math.Distance.Between(
			this.player.x, this.player.y,
			this.doorX,this.doorY
		)
		const nearDoor = dist<90
		this.enterPrompt
				.setVisible(nearDoor)
				.setPosition(this.player.x,this.player.y-44)

		if(nearDoor && Phaser.Input.Keyboard.JustDown(this.eKey)){
			this.cameras.main.fadeOut(500,0,0,0)
			this.cameras.main.once('camerafadeoutcomplete', () =>{
				this.scene.start('ArcadeScene')
			})
		}
	}
}

