export class Player {
    public sprite: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number, main?: boolean) {
        this.sprite = game.add.sprite(x, y, "dude", 4);
        this.sprite.anchor.setTo(0.5);
        this.sprite.animations.add("left", [0, 1, 2, 3], 7, true);
        this.sprite.animations.add("right", [5, 6, 7, 8], 7, true);
        game.physics.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        if (main) {
            game.camera.follow(this.sprite);
        }
    }
}
