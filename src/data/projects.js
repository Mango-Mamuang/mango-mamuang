
export const PROJECTS = [
	{
		id: 1,
		machineLabel: 'PROJECT\nONE', //arcade screen
		title: '2D TOP-DOWN GAME',
		description: 'Top down Unity game with AI driven enemy behavior, custom level design, and core gameplay mechanics.',
		techStack: ['2026','Unity', 'C#', 'AI Algorithms'],
		githubLink: 'https://github.com/Mango-Mamuang/NO-TITLE-YET-THE-GAME',
		//liveLink: 'livelink goes here',
		cabinetColor: 0xcc00f, //neon purple (phaser3)
	},

	
	{
		id: 2,
		machineLabel: 'PROJECT\nTWO', //arcade screen
		title: 'Polyp Detection',
		description: 'Trained a YOLOv12 model to detect polyps in endoscopic images on the Kvasir SEG dataset. Used augmentation and experiment tracking in Weights and Biases.',
		techStack: ['2025', 'Python', 'YOLOv12', 'Weights & Biases'],
		githubLink: 'https://github.com/Mango-Mamuang/Polyp-Detection-',
		


		//open resume
		liveLink: '/senior_project_report.pdf',

		//liveLink: 'livelink goes here',
		cabinetColor: 0xcc00ff, //neon purple (phaser3)
	},

 {
                id: 3,
                machineLabel: 'PROJECT\nTHREE', //arcade screen
                title: 'Multiplayer Game Server and Client',
 //               description: 'Socket based server hosting Tic Tac Toe, Connect 4, and Mancala, with multi threading client handling',
                description: 'A TCP-based multiplayer game server built in Python. Two players connect over a network, complete a handshake, and choose from Tic-Tac-Toe, Connect 4, or Mancala.',
	 	techStack: ['2024', 'Python', 'Sockets', 'Multi Threading'],
                githubLink: 'https://github.com/Mango-Mamuang/Multiplayer-Game-Server',
                liveLink: '/report_LAN_server.pdf',
                cabinetColor: 0xcc00f, //neon green (phaser3)
        },

 {
                id: 4,
                machineLabel: 'PROJECT\nFOUR', //arcade screen
                title: 'PING PONG',
                description: '2 player Ping Pong game in x86 Assembly, with game logic, collision detection, and rendering',
                techStack: ['2024', 'Assembly x86', 'Low Level Programming'],
                githubLink: 'https://github.com/Mango-Mamuang/PING-PONG',
                //liveLink: 'livelink goes here',
                cabinetColor: 0xcc00ff, //neon purple (phaser3)
        },
]
