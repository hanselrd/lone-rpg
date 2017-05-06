export class Boot extends Phaser.State {
    public init(): void {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally;
        }
    }

    public preload(): void {
        this.load.image("background", require("../../assets/backgrounds/bg-800x600.png"));
        this.load.image("preloadBar", require("../../assets/spritesheets/dude.png"));
    }

    public create(): void {
        this.state.start("preloader");
    }
}
