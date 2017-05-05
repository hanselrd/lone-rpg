import { Player } from "../models/player";

export class Play extends Phaser.State {
    private coordsText: Phaser.Text;
    private cursors: Phaser.CursorKeys;
    private map: Phaser.Tilemap;
    private player: Player;
    private trees: Phaser.Group;

    public init(): void {
        this.stage.disableVisibilityChange = true;
    }

    public preload(): void {
        this.load.tilemap("world", require("../../assets/maps/world.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet("Base", require("../../assets/tilesets/base.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("City", require("../../assets/tilesets/city.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("dude", require("../../assets/spritesheets/dude.png"), 32, 48);
    }

    public create(): void {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap("world");
        this.map.addTilesetImage("Base");
        this.map.addTilesetImage("City");
        const layer = this.map.createLayer("Background");
        layer.resizeWorld();
        layer.inputEnabled = true;

        this.trees = this.add.group();
        this.trees.enableBody = true;
        this.map.createFromObjects("Trees", 646, "Base", 645, true, true, this.trees);
        this.trees.setAll("body.immovable", true);

        this.player = new Player(this.game, 100, 300);

        this.map.createLayer("Foreground");

        this.coordsText = this.add.text(0, 0, "");
        this.coordsText.fixedToCamera = true;
    }

    public update(): void {
        if (this.player) {
            this.physics.arcade.collide(this.player.sprite, this.trees);

            this.player.update();

            this.coordsText.text = `(${this.player.sprite.body.position.x}, ${this.player.sprite.body.position.y})`;

            if (this.cursors.left.isDown) {
                this.player.move(-150, 0);
            }

            if (this.cursors.up.isDown) {
                this.player.move(0, -150);
            }

            if (this.cursors.right.isDown) {
                this.player.move(150, 0);
            }

            if (this.cursors.down.isDown) {
                this.player.move(0, 150);
            }

            if (this.cursors.left.isUp &&
                this.cursors.up.isUp &&
                this.cursors.right.isUp &&
                this.cursors.down.isUp) {
                this.player.sprite.animations.stop();
                this.player.sprite.animations.frame = 4;
            }
        }
    }
}
