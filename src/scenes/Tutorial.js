class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene' })
    }

    create() {
        // Instructions
        this.add.text(200, 100, 'Use arrow keys ↑ ↓ → ← to move', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)
        this.add.text(200, 130, 'Avoid the obstacles', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)
        this.add.text(200, 160, 'Collect the diamonds', { font: '16px Arial', fill: '#ffffff', align: 'center' }).setOrigin(0.5)

        // Return to menu button
        let returnButton = this.add.image(200, 250, 'returnButton').setInteractive().setScale(0.5)
        returnButton.setOrigin(0.5)
        returnButton.on('pointerdown', () => {
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
