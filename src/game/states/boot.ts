// import background from "@/assets/images/bg-1366x768.png";
// import preloadBar from "@/assets/images/preload.png";

export default class Boot extends Phaser.State {
  public init() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (!this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
    }

    this.scale.pageAlignHorizontally = true;
  }

  public preload() {
    // this.load.image("background", background);
    // this.load.image("preloadBar", preloadBar);
  }

  public create() {
    // this.state.start("preloader");
  }
}
