import { Menu } from "./states/menu";
import { Play } from "./states/play";

export class Game {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * devicePixelRatio, Phaser.AUTO, "game");
        this.game.state.add("menu", new Menu());
        this.game.state.add("play", new Play());
        this.game.state.start("menu");
    }
}
