import * as Express from "express";
import * as Http from "http";
import * as SocketIO from "socket.io";
import { Player } from "./models/player";

const app = Express();
const port = process.env.PORT || 3000;
const server = Http.createServer(app);
const io = SocketIO(server);

app.use(Express.static(__dirname + "/app"));

app.use("/", (req: Express.Request, res: Express.Response) => {
    res.sendFile(__dirname + "/app/index.html");
});

const players = new Map<string, [number, number]>();

function randomInt(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
}

io.on("connection", (socket: SocketIO.Socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("addPlayer", () => {
        players[socket.id] = [randomInt(100, 500), randomInt(100, 500)];

        socket.emit("addAllPlayers", players);
        socket.broadcast.emit("addPlayer", socket.id, players[socket.id][0], players[socket.id][1]);

        socket.on("movePlayer", (x: number, y: number) => {
            players[socket.id] = [x, y];
            socket.broadcast.emit("movePlayer", socket.id, x, y);
        });

        socket.on("disconnect", () => {
            delete players[socket.id];
            io.emit("removePlayer", socket.id);
            console.log(`Disconnected: ${socket.id}`);
        });
    });
});

server.listen(port, () => {
    console.log(`Listening on: ${port}`);
});
