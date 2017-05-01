import { Play } from "./play";

export class MainMenu extends Phaser.State {
    private myKey: Phaser.Key;

    public preload() {
        this.game.load.image("background", require("../../assets/backgrounds/bg-800x600.png"));
    }

    public create() {
        this.myKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        this.game.add.sprite(0, 0, "background");
        this.game.add.text(16, 16, "MainMenu", { fontSize: 32, fill: "#0F0" });
    }

    public update() {
        if (this.myKey.isDown) {
            this.game.state.add("Play", new Play());
            this.game.state.start("Play");
        }
    }
}
