import "../app.css";
import "p2";
import "pixi";
import "phaser";
import { MainMenu } from "./states/main-menu";

const game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
game.state.add("MainMenu", new MainMenu());
game.state.start("MainMenu");
