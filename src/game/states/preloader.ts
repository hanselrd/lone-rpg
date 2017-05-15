export default class Preloader extends Phaser.State {
  private preloadBar: Phaser.Sprite;

  public preload(): void {
    this.add.sprite(0, 0, "background");
    this.preloadBar = this.add.sprite(0, 0, "preloadBar");
    this.load.setPreloadSprite(this.preloadBar);
    this.load.tilemap("world", null, require("@/assets/maps/world.json"), Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet("Base", require("@/assets/tilesets/base.png"), 16, 16, -1, 0, 1);
    this.load.spritesheet("City", require("@/assets/tilesets/city.png"), 16, 16, -1, 0, 1);
    this.load.spritesheet("player", require("@/assets/spritesheets/player.png"), 64, 64);
  }

  public create(): void {
    this.state.start("main-menu");
  }
}
