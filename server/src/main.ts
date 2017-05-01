import * as Express from "express";
import * as Http from "http";
import * as SocketIO from "socket.io";

const app = Express();
const port = process.env.PORT || 3000;
const server = Http.createServer(app);
const io = SocketIO(server);

app.use(Express.static(__dirname + "/app"));

app.use("/", (req: Express.Request, res: Express.Response) => {
    res.sendFile(__dirname + "/app/index.html");
});

io.on("connection", (socket: SocketIO.Socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("chat message", (msg: string) => {
        console.log(`message: ${msg}`);
        io.emit("chat message", msg);
    });
});

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
