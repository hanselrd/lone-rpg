import { GameObject } from "./game-object";

export class Player extends GameObject {
    public sprite: Phaser.Sprite;
    private other: boolean;

    constructor(game: Phaser.Game, x: number, y: number, other?: boolean) {
        super(game);
        this.sprite = game.add.sprite(x, y, "dude", 4);
        this.sprite.anchor.setTo(0.5);
        this.sprite.animations.add("left", [0, 1, 2, 3], 7, true);
        this.sprite.animations.add("right", [5, 6, 7, 8], 7, true);
        game.physics.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.other = other;
        if (!other) {
            game.camera.follow(this.sprite);
        }
    }

    public update() {
        this.sprite.body.velocity.setTo(0);
    }

    public move(offsetX: number, offsetY?: number) {
        if (offsetY === undefined) {
            this.sprite.body.velocity.setTo(offsetX);
        } else {
            this.sprite.body.velocity.setTo(offsetX, offsetY);
        }
        if (offsetX < 0) {
            this.sprite.animations.play("left");
        } else if (offsetX > 0) {
            this.sprite.animations.play("right");
        }
    }
}
