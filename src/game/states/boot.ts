export default class Boot extends Phaser.State {
  public init(): void {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (!this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
    }

    this.scale.pageAlignHorizontally = true;
  }

  public preload(): void {
    this.load.image("background", require("@/assets/images/bg-1366x768.png"));
    this.load.image("preloadBar", require("@/assets/images/preload.png"));
  }

  public create(): void {
    this.state.start("preloader");
  }
}
