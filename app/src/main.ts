import '../public/app.css';

class App {
    private name: string;

    constructor(name: string) {
        this.setName(name);
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }
}

const app = new App('test');
console.log(app.getName());
app.setName('test2');
console.log(app.getName());
