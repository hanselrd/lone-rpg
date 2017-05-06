import { Boot } from "./states/boot";
import { Menu } from "./states/menu";
import { Play } from "./states/play";
import { Preloader } from "./states/preloader";

export class Game {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
            window.innerHeight * devicePixelRatio, Phaser.AUTO, "game");
        this.game.state.add("boot", new Boot());
        this.game.state.add("preloader", new Preloader());
        this.game.state.add("menu", new Menu());
        this.game.state.add("play", new Play());
        this.game.state.start("boot");
    }
}
