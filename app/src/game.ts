import { Menu } from "./states/menu";
import { Play } from "./states/play";

export class Game {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
        this.game.state.add("menu", new Menu());
        this.game.state.add("play", new Play());
        this.game.state.start("menu");
    }
}
