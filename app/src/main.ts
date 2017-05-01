import "../scss/main.scss";
import "p2";
import "pixi";
import "phaser";
import "socketio";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
    console.log("we connected :D");
});

socket.emit("chat message", "hey, this is from the front end");

socket.on("chat message", (msg: string) => {
    console.log(`message: ${msg}`);
});
