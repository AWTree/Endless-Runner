class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' })
    }

    preload() {
        // Preload assets
        this.load.path = './assets/'
        // this.load.image('menuBackground', 'menuBackground.png')
        this.load.image('playButton', 'buttons/playButton.png')
        this.load.image('tutorialButton', 'buttons/tutorialButton.png')
        this.load.image('creditsButton', 'buttons/creditsButton.png')
        this.load.image('returnButton', 'buttons/returnButton.png')
        this.load.image('restartButton', 'buttons/restartButton.png')
        this.load.audio('click', 'click.mp3')
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
            this.sound.play('click')
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
            this.sound.play('click')
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
            this.sound.play('click')
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

