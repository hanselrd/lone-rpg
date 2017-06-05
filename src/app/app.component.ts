import { Component } from '@angular/core';
import * as Phaser from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(640, 480, Phaser.AUTO, '#game');
  }
}
