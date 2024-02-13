class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' })
    }

    preload() {
        // Preload assets
        this.load.path = './assets/buttons/'
        // this.load.image('menuBackground', 'menuBackground.png')
        this.load.image('playButton', 'playButton.png')
        this.load.image('tutorialButton', 'tutorialButton.png')
        this.load.image('creditsButton', 'creditsButton.png')
        this.load.image('returnButton', 'returnButton.png')
        this.load.image('restartButton', 'restartButton.png')
    }

    create() {
        // Menu background
        // this.add.image(200, 150, 'menuBackground').setScale(0.5)

        // Game title
        let title = this.add.text(200, 50, 'Endless Forest', { font: '31px Arial', fill: '#fff', stroke: '#436850', strokeThickness: 6})
        title.setOrigin(0.5)

        // Play 
        let playButton = this.add.image(200, 120, 'playButton').setInteractive().setScale(0.5)
        playButton.on('pointerdown', () => {
            this.scene.start('loadScene')
        })

        playButton.on('pointerover', () => {
            playButton.setScale(0.45)
        })
        playButton.on('pointerout', () => {
            playButton.setScale(0.5)
        })

        // Tutorial 
        let tutorialButton = this.add.image(200, 180, 'tutorialButton').setInteractive().setScale(0.5)
        tutorialButton.on('pointerdown', () => {
            // Here you would switch to a tutorial scene
            this.scene.start('tutorialScene')
        })

        tutorialButton.on('pointerover', () => {
            tutorialButton.setScale(0.45)
        })
        tutorialButton.on('pointerout', () => {
            tutorialButton.setScale(0.5)
        })

        // Credits 
        let creditsButton = this.add.image(200, 240, 'creditsButton').setInteractive().setScale(0.5)
        creditsButton.on('pointerdown', () => {
            // Here you would switch to a credits scene
            this.scene.start('creditsScene')
        })

        creditsButton.on('pointerover', () => {
            creditsButton.setScale(0.45)
        })
        creditsButton.on('pointerout', () => {
            creditsButton.setScale(0.5)
        })

        // Adjusting the origin for center alignment
        playButton.setOrigin(0.5)
        tutorialButton.setOrigin(0.5)
        creditsButton.setOrigin(0.5)
    }
}

