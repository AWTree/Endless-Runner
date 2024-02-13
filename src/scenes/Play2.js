class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2")
    }

    create() {
        this.isGameOver = false 

        // scrolling background
        const width = this.scale.width
        const height = this.scale.height
        const totalHeight = height * 2

        // add background image
        this.map = this.add.tileSprite(0, 0, width, totalHeight, 'map').setOrigin(0)

        // setup Hero
        this.lastMoveTime = this.time.now
        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'up')
        this.hero.setCollideWorldBounds(true)

        // obstacles
        this.obstacles = this.physics.add.group()

        // randomly generate obstacles
        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                if (!this.isGameOver) { 
                    this.generateObstacle()
                }
            },
            callbackScope: this,
            loop: true
        })

        this.playerObstacleCollider = this.physics.add.overlap(this.hero, this.obstacles, this.handleCollision, null, this)

        // player health
        this.playerHealth = 3
        this.healthDisplay = []

        for (let i = 0; i < this.playerHealth; i++) {
            let heart = this.add.image(40 + (i * 30), 16, 'heart').setOrigin(1, 0).setScale(0.5).setDepth(1002).setScrollFactor(0)
            this.healthDisplay.push(heart)
        }

        // player points
        this.diamonds = this.physics.add.group()

        // randomly generate diamonds
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000), 
            callback: this.generateDiamond,
            callbackScope: this,
            loop: true,
        })

        // setup collision
        this.physics.add.overlap(this.hero, this.diamonds, this.collectDiamond, null, this)

        // display time and points
        this.score = 0
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '15px', fill: '#fff' }).setScrollFactor(0).setOrigin(1, 0).setDepth(1002).setX(this.cameras.main.width - 16)
        this.timeText = this.add.text(16, 40, '', { fontSize: '15px', fill: '#fff' }).setScrollFactor(0).setOrigin(1, 0).setDepth(1002).setX(this.cameras.main.width - 16)

        // update the timer
        this.initialTime = 0
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.initialTime >= 0 && !this.isGameOver) {
                    this.initialTime += 1;
                    this.timeText.setText('Time: ' + this.initialTime);
                }
            },
            callbackScope: this,
            loop: true
        })

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.cursors = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // camera
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.hero, true, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)

        // display menu
        this.createGameOverMenu()

        // update instruction text
        // document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)'
    }

    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
        if (!this.isGameOver) {
            this.map.tilePositionY -= 2
        }

        // scroll Hero backwards
        const moveThreshold = 0
        const currentTime = this.time.now
        const backwardSpeed = 2

        if (!this.isGameOver) {
        // Check for movement input
            if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
                this.lastMoveTime = currentTime
            }

            // If no movement for more than the threshold, move the player up (backward)
            if (currentTime - this.lastMoveTime > moveThreshold) {
                this.hero.y += backwardSpeed
            }
        }
    }

    generateObstacle() {
        const positionX = Phaser.Math.Between(0, this.game.config.width)
        const obstacle = this.obstacles.create(positionX, 0, 'trees').setScale(1.5)
        obstacle.setVelocityY(100)
    }

    handleCollision(hero, obstacle) {
        // temporarily ignore collisions if hit
        this.physics.world.removeCollider(this.playerObstacleCollider)
    
        // update player health
        this.playerHealth -= 1
        this.updateHealth(this.playerHealth)

        // hit
        hero.setAlpha(0.5)
        this.time.delayedCall(1000, () => {
            hero.setAlpha(1)
            this.playerObstacleCollider = this.physics.add.overlap(this.hero, this.obstacles, this.handleCollision, null, this)
        }, [], this)

        // check for ending
        if (this.playerHealth == 0) {
            this.gameOverMenu.setVisible(true)
       
            this.physics.pause() 
            hero.setTint(0xff0000)
            hero.anims.stop()
            this.isGameOver = true
        } else {
            console.log(`Health: ${this.playerHealth}`)
        }
    }

    createGameOverMenu() {
        // align to the center
        const centerX = this.cameras.main.centerX
        const centerY = this.cameras.main.centerY
    
        this.gameOverMenu = this.add.container(centerX, centerY).setDepth(1000)
    
        let menuBackground = this.add.rectangle(0, 0, 200, 100, 0x000000, 0.8).setOrigin(0.5).setDepth(1001)
        let restartButton = this.add.image(0, -20, 'restartButton').setOrigin(0.5).setInteractive().setScale(0.5).setDepth(1002)
        let titleButton = this.add.image(0, 20, 'returnButton').setOrigin(0.5).setInteractive().setScale(0.5).setDepth(1002)
    
        this.gameOverMenu.add([menuBackground, restartButton, titleButton])
    
        // menu buttons
        restartButton.on('pointerdown', () => this.scene.restart())
        titleButton.on('pointerdown', () => this.scene.start('menuScene'))

        // hover effect
        restartButton.on('pointerover', () => {
            restartButton.setScale(0.45)
        })
        restartButton.on('pointerout', () => {
            restartButton.setScale(0.5)
        })

        titleButton.on('pointerover', () => {
            titleButton.setScale(0.45)
        })
        titleButton.on('pointerout', () => {
            titleButton.setScale(0.5)
        })
    
        // hide the menu
        this.gameOverMenu.setVisible(false)
    }

    updateHealth(health) {
        // player health
        this.playerHealth = health;
    
        // remove
        this.healthDisplay.forEach((heart) => {
            heart.destroy()
        })
    
        // clear the array
        this.healthDisplay = []

        for (let i = 0; i < this.playerHealth; i++) {
            let heart = this.add.image(40 + (i * 30), 16, 'heart').setOrigin(1, 0).setScale(0.5).setDepth(1002).setScrollFactor(0)
            this.healthDisplay.push(heart)
        }
    }

    generateDiamond() {
        if (!this.isGameOver) {
            const positionX = Phaser.Math.Between(0, this.game.config.width)
            const diamond = this.diamonds.create(positionX, 0, 'diamond').setScale(0.5) 
            diamond.setVelocityY(100)
        }
    }      

    collectDiamond(hero, diamond) {
        diamond.disableBody(true, true)
        this.score += 20 // add points
        this.scoreText.setText('Score: ' + this.score)
    }
}