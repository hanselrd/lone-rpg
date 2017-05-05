export abstract class GameObject {
    protected game: Phaser.Game;

    constructor(game: Phaser.Game) {
        this.game = game;
    }

    public abstract update();

    public abstract move(offsetX: number, offsetY?: number);
}
