import "../public/app.css";
import { Game } from "./game";

class App {
    private name: string;

    constructor(name: string) {
        this.setName(name);
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
}

const app = new App("test");
console.log(app.getName());
app.setName("test2");
console.log(app.getName());

const game = new Game();
