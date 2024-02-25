// Name: Arno Wu
// Title: Endless Forest
// Approximate Time: 20h
/* 
Creative Tilt: I made a top-down perspective Endless Runner that is different from the side-scrolling one.
The idea is a lost boy trying to escape the forest. For the UI&UX design, I made the UI buttons scale up when hovering
which I think is visually appealing. For visual style, the art pieces were all designed by myself. 
Also, I painted the pixel sprites in more detail to make them more stylized.
I am proud of the apple sprite, the diamond sprite, and the player sprite for their art style. Besides, I am proud of 
the background music that I made with 3 different instruments in GarageBand since I am a complete beginner to music by any means.
For the programming part, I am proud that I made the player able to pass through the trees for a few seconds after
colliding with them. I think this would make the gameplay more fluent. 
*/

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 400,
    height: 300,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Tutorial, Credits, Load, Play ]
}

const game = new Phaser.Game(config)