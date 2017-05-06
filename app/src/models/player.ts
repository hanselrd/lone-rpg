import { GameObject } from "./game-object";

export class Player extends GameObject {
    private cursors: Phaser.CursorKeys;
    public sprite: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.sprite = game.add.sprite(x, y, "dude", 4);
        this.sprite.anchor.setTo(0.5);
        this.sprite.animations.add("left", [0, 1, 2, 3], 7, true);
        this.sprite.animations.add("right", [5, 6, 7, 8], 7, true);
        game.physics.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        game.camera.follow(this.sprite);
    }

    public update(): void {
        this.sprite.body.velocity.setTo(0);

        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play("left");
        }

        if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;
        }

        if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play("right");
        }

        if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;
        }

        if (this.cursors.left.isUp &&
            this.cursors.up.isUp &&
            this.cursors.right.isUp &&
            this.cursors.down.isUp) {
            this.sprite.animations.stop();
            this.sprite.animations.frame = 4;
        }
    }
}
