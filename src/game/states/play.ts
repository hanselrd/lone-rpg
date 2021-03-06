import Player from "../models/player";

export default class Play extends Phaser.State {
  private coordsText: Phaser.Text;
  private map: Phaser.Tilemap;
  private player: Player;
  private trees: Phaser.Group;

  public create(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap("world");
    this.map.addTilesetImage("base");
    this.map.addTilesetImage("city");
    const layer = this.map.createLayer("Background");
    layer.resizeWorld();
    layer.inputEnabled = true;
    this.trees = this.add.group();
    this.trees.enableBody = true;
    this.map.createFromObjects("Trees", 646, "base", 645, true, true, this.trees);
    this.trees.setAll("body.immovable", true);

    this.player = new Player(this.game, 100, 300);

    this.map.createLayer("Foreground");

    this.coordsText = this.add.text(0, 0);
    this.coordsText.fixedToCamera = true;
  }

  public update(): void {
    this.physics.arcade.collide(this.player.sprite, this.trees);
    this.player.update();
    this.coordsText.text = `(${Math.floor(this.player.sprite.body.position.x)}, ` +
      `${Math.floor(this.player.sprite.body.position.y)})`;
  }
}
