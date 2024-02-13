class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load the visual goodz
        this.load.path = './assets/'
        this.load.spritesheet('hero', 'hero-sheet02.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image('map', 'map01.png')
        this.load.image('heart', 'heart.png')
        this.load.image('diamond', 'diamond.png')
        this.load.image('apple', 'apple.png')
        this.load.image('trees', 'trees.png')
    }

    create() {
        // hero animations (walking)
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        })

        // proceed once loading completes
        this.scene.start('playScene')
    }
}