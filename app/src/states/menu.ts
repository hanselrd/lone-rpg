export class Menu extends Phaser.State {
    private playKey: Phaser.Key;
    private playButton: Phaser.Button;

    public preload() {
        this.load.image("background", require("../../assets/backgrounds/bg-800x600.png"));
    }

    public create() {
        this.playKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        this.add.sprite(0, 0, "background");
        this.add.text(30, 30, "Hit [ENTER] to Play!", {
            fill: "#0f0",
            fontSize: 32,
        });
        this.playButton = this.add.button(30, 30, "k", () => {
            this.state.start("play");
        });
        //this.playButton.fixedToCamera = true;
    }

    public update() {
        if (this.playKey.isDown) {
            this.state.start("play");
        }
    }
}
