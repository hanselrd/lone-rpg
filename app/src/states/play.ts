import { Player } from "../models/player";

export class Play extends Phaser.State {
    private coordsText: Phaser.Text;
    private cursors: Phaser.CursorKeys;
    private map: Phaser.Tilemap;
    private players: Map<string, Player>;
    private trees: Phaser.Group;
    private socket: SocketIOClient.Socket;

    constructor(socket: SocketIOClient.Socket) {
        super();
        this.socket = socket;
    }

    public init() {
        this.stage.disableVisibilityChange = true;
    }

    public preload() {
        this.load.tilemap("world", require("../../assets/maps/world.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet("Base", require("../../assets/tilesets/base.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("City", require("../../assets/tilesets/city.png"), 16, 16, -1, 0, 1);
        this.load.spritesheet("dude", require("../../assets/spritesheets/dude.png"), 32, 48);
    }

    public create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = this.add.tilemap("world");
        this.map.addTilesetImage("Base");
        this.map.addTilesetImage("City");
        const layer = this.map.createLayer("Background");
        layer.resizeWorld();
        layer.inputEnabled = true;

        this.trees = this.add.group();
        this.trees.enableBody = true;
        this.map.createFromObjects("Trees", 646, "Base", 645, true, true, this.trees);
        this.trees.setAll("body.immovable", true);
        this.map.createLayer("Foreground");

        this.coordsText = this.add.text(0, 0, "");
        this.coordsText.fixedToCamera = true;

        this.players = new Map<string, Player>();

        this.socket.emit("addPlayer");

        this.socket.on("addPlayer", (id: string, x: number, y: number) => {
            this.addPlayer(id, x, y);
        });

        this.socket.on("addAllPlayers", (data: Map<string, [number, number]>) => {
            for (const id in data) {
                this.addPlayer(id, data[id][0], data[id][1]);
            }
            console.log(data);
        });

        this.socket.on("movePlayer", (id: string, x: number, y: number) => {
            this.movePlayer(id, x, y);
        });

        this.socket.on("removePlayer", (id: string) => {
            this.removePlayer(id);
        });
    }

    public update() {
        if (this.players[this.socket.id]) {
            this.physics.arcade.collide(this.players[this.socket.id].sprite, this.trees);

            this.players[this.socket.id].sprite.body.velocity.x = 0;
            this.players[this.socket.id].sprite.body.velocity.y = 0;

            this.coordsText.text = `(${this.players[this.socket.id].sprite.body.position.x}, ${this.players[this.socket.id].sprite.body.position.y})`;

            if (this.cursors.left.isDown) {
                this.players[this.socket.id].sprite.body.velocity.x = -150;
                this.players[this.socket.id].sprite.animations.play("left");
            }

            if (this.cursors.up.isDown) {
                this.players[this.socket.id].sprite.body.velocity.y = -150;
            }

            if (this.cursors.right.isDown) {
                this.players[this.socket.id].sprite.body.velocity.x = 150;
                this.players[this.socket.id].sprite.animations.play("right");
            }

            if (this.cursors.down.isDown) {
                this.players[this.socket.id].sprite.body.velocity.y = 150;
            }

            if (this.cursors.left.isUp &&
                this.cursors.up.isUp &&
                this.cursors.right.isUp &&
                this.cursors.down.isUp) {
                    this.players[this.socket.id].sprite.animations.stop();
                    this.players[this.socket.id].sprite.animations.frame = 4;
                }

            //this.socket.emit("movePlayer", this.players[this.socket.id].sprite.worldPosition.x,
            //    this.players[this.socket.id].sprite.worldPosition.y);
        }
    }

    public addPlayer(id: string, x: number, y: number) {
        if (id === this.socket.id) {
            this.players[id] = new Player(this.game, x, y, true);
        } else {
            this.players[id] = new Player(this.game, x, y, false);
        }
    }

    public movePlayer(id: string, x: number, y: number) {
        /*const player = this.players[id];
        const tween = this.add.tween(player);
        const distance = Phaser.Math.distance(player.sprite.position.x, player.sprite.position.y, x, y);
        const duration = distance * 10;
        tween.to({ x, y }, duration);
        tween.start();*/
        const player = this.players[id];
        player.sprite.position = x;
        player.sprite.position = y;
    }

    public removePlayer(id: string) {
        this.players[id].sprite.destroy();
        delete this.players[id];
    }
}
