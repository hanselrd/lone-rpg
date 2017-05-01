import "../scss/main.scss";
import "p2";
import "pixi";
import "phaser";
import "socketio";

const socket = io();
socket.on("connect", () => {
    console.log("we connected :D");
});
