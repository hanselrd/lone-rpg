import "../scss/main.scss";

import "p2";
import "pixi";
import "phaser";
import "socketio";

import { Game } from "./game";

/*
const socket = io();
socket.on("connect", () => {
    console.log("Connected to server");
});
*/

const game = new Game();
