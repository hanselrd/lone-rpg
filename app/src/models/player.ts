import { GameObject } from "./game-object";

export class Player extends GameObject {
    public sprite: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private speed: number;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);
        this.sprite = game.add.sprite(x, y, "player", 130);
        this.sprite.anchor.setTo(0.5);
        this.sprite.animations.add("walkUp", [105, 106, 107, 108, 109, 110, 111, 112], 7, true);
        this.sprite.animations.add("walkLeft", [118, 119, 120, 121, 122, 123, 124, 125], 7, true);
        this.sprite.animations.add("walkDown", [131, 132, 133, 134, 135, 136, 137, 138], 7, true);
        this.sprite.animations.add("walkRight", [144, 145, 146, 147, 148, 149, 150, 151], 7, true);
        game.physics.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        game.camera.follow(this.sprite);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.speed = 100;
        this.sprite.animations.play("walkDown");
    }

    public update(): void {
        this.sprite.body.velocity.setTo(0);

        if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -this.speed;
            this.sprite.animations.play("walkUp");
        }

        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -this.speed;
            this.sprite.animations.play("walkLeft");
        }

        if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = this.speed;
            this.sprite.animations.play("walkDown");
        }

        if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = this.speed;
            this.sprite.animations.play("walkRight");
        }

        if (this.cursors.up.isUp &&
            this.cursors.left.isUp &&
            this.cursors.down.isUp &&
            this.cursors.right.isUp) {
            this.sprite.animations.stop();
            switch (this.sprite.animations.currentAnim.name) {
                case "walkUp":
                    this.sprite.animations.frame = 104;
                    break;
                case "walkLeft":
                    this.sprite.animations.frame = 117;
                    break;
                case "walkDown":
                    this.sprite.animations.frame = 130;
                    break;
                case "walkRight":
                    this.sprite.animations.frame = 143;
                    break;
            }
        }
    }
}
