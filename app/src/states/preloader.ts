export class Preloader extends Phaser.State {
    private background: Phaser.Sprite;
    private preloadBar: Phaser.Sprite;

    public preload(): void {
        this.background = this.add.sprite(0, 0, "background");
        this.preloadBar = this.add.sprite(300, 400, "preloadBar");

        this.load.setPreloadSprite(this.preloadBar);

        this.load.tilemap("world", require("../../assets/maps/world.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet("Base", require("../../assets/tilesets/base.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("City", require("../../assets/tilesets/city.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("player", require("../../assets/spritesheets/player.png"), 64, 64);
    }

    public create(): void {
        this.state.start("menu");
    }
}
