class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' })
    }

    create() {
        // Instructions
        this.add.text(200, 100, 'Use arrow keys ↑ ↓ → ← to move', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)
        this.add.text(200, 130, 'Collect a diamond for 20 points', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)
        this.add.text(200, 160, 'Collect an apple for 10 points', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)
        this.add.text(200, 190, 'Avoid the trees', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)

        // Return to menu button
        let returnButton = this.add.image(200, 250, 'returnButton').setInteractive().setScale(0.5)
        returnButton.setOrigin(0.5)
        returnButton.on('pointerdown', () => {
            this.sound.play('click')
            this.scene.start('menuScene')
        })

        returnButton.on('pointerover', () => {
            returnButton.setScale(0.45)
        })
        returnButton.on('pointerout', () => {
            returnButton.setScale(0.5)
        })
    }
}
