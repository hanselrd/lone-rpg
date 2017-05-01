import "p2";
import "pixi";
import "phaser";

export class Game {
    private game: Phaser.Game;
    private platforms: Phaser.Group;
    private stars: Phaser.Group;
    private player: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private score: number;
    private scoreText: Phaser.Text;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {
            create: this.create,
            preload: this.preload,
            update: this.update,
        });
    }

    private preload() {
        this.game.load.spritesheet("dude", require("../assets/dude.png"), 32, 32);
    }

    private create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        const ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        let ledge = this.platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        const style = {
            align: "center",
            fill: "yellow",
            font: "30px Arial",
        };
        this.game.add.text(0, 0, "Hello World!", style);
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        for (let i = 0; i < 12; ++i) {
            const star = this.stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 6;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.score = 0;
        this.scoreText = this.game.add.text(16, 16, `Score: ${this.score}`, { fontSize: 32, fill: "#0F0" });
    }

    private update() {
        const hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
            this.player.body.velocity.y = -350;
        }

        this.game.physics.arcade.collide(this.stars, this.platforms);
        this.game.physics.arcade.overlap(this.player, this.stars, (player: Phaser.Sprite, star: Phaser.Sprite) => {
            star.kill();
            this.score += 10;
            this.scoreText.text = `Score: ${this.score}`;
        });
    }
}
