export class Play extends Phaser.State {
    private coordsText: Phaser.Text;
    private cursors: Phaser.CursorKeys;
    private map: Phaser.Tilemap;
    private player: Phaser.Sprite;
    private trees: Phaser.Group;

    public preload() {
        this.game.load.tilemap("world", require("../../assets/maps/world.json"), null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet("Base", require("../../assets/tilesets/base.png"), 16, 16, -1, 0, 1);
        this.game.load.spritesheet("City", require("../../assets/tilesets/city.png"), 16, 16, -1, 0, 1);
        this.game.load.spritesheet("dude", require("../../assets/spritesheets/dude.png"), 32, 48);
    }

    public create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.map = this.game.add.tilemap("world");
        this.map.addTilesetImage("Base");
        this.map.addTilesetImage("City");
        this.map.createLayer("Background").resizeWorld();

        this.player = this.game.add.sprite(100, 300, "dude", 4);
        this.player.anchor.setTo(0.5);
        this.player.animations.add("left", [0, 1, 2, 3], 7, true);
        this.player.animations.add("right", [5, 6, 7, 8], 7, true);
        this.game.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.camera.follow(this.player);

        this.trees = this.game.add.group();
        this.trees.enableBody = true;
        this.map.createFromObjects("Trees", 646, "Base", 645, true, true, this.trees);
        this.trees.setAll("body.immovable", true);
        this.map.createLayer("Foreground");

        this.coordsText = this.game.add.text(0, 0, "");
        this.coordsText.fixedToCamera = true;
    }

    public update() {
        this.game.physics.arcade.collide(this.player, this.trees);

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.coordsText.text = `(${this.player.body.position.x}, ${this.player.body.position.y})`;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        }

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -150;
        }

        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        }

        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 150;
        }

        if (this.cursors.left.isUp &&
            this.cursors.up.isUp &&
            this.cursors.right.isUp &&
            this.cursors.down.isUp) {
                this.player.animations.stop();
                this.player.animations.frame = 4;
            }
    }
}
