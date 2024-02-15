class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' })
    }

    create() {
        // Credits text
        this.add.text(200, 40, 'Programming: Arno Wu', { font: '16px Arial', fill: '#ffffff', align: 'left' }).setOrigin(0.5)
        this.add.text(200, 80, 'Backgournd Music: Arno Wu', { font: '16px Arial', fill: '#ffffff', align: 'left' }).setOrigin(0.5)
        this.add.text(200, 120, 'Ending Sound Effect: Arno Wu', { font: '16px Arial', fill: '#ffffff', align: 'left' }).setOrigin(0.5)
        this.add.text(200, 160, 'Art: Arno Wu', { font: '16px Arial', fill: '#ffffff', align: 'left' }).setOrigin(0.5)
        this.add.text(200, 200, 'Sound Effects: https://uppbeat.io/sfx/tag/game-show', { font: '16px Arial', fill: '#ffffff', align: 'left' }).setOrigin(0.5)

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
