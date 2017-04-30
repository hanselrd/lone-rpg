import "p2";
import "pixi";
import "phaser";

export class Game {
    private game: Phaser.Game;
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", {
            create: this.create,
            preload: this.preload,
            update: this.update,
        });
    }

    public preload() {}

    public create() {
        const text = "Hello world";
        const style = {
            align: "center",
            fill: "#ff0000",
            font: "65px Arial",
        };
        this.game.add.text(0, 0, text, style);
    }

    public update() {}
}
