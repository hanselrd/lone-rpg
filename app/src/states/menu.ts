export class Menu extends Phaser.State {
    private playKey: Phaser.Key;

    public preload() {
        this.game.load.image("background", require("../../assets/backgrounds/bg-800x600.png"));
    }

    public create() {
        this.playKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        this.game.add.sprite(0, 0, "background");
        this.game.add.text(30, 30, "Hit [ENTER] to Play!", {
            fill: "#0f0",
            fontSize: 32,
        });
    }

    public update() {
        if (this.playKey.isDown) {
            this.game.state.start("play");
        }
    }
}
