<template>
    <div id="game"></div>
</template>

<script lang="ts">
  import "pixi";
  import "p2";
  import "phaser";

  import Boot from "@/game/states/boot";
  import Preloader from "@/game/states/preloader";
  import MainMenu from "@/game/states/main-menu";
  import Play from "@/game/states/play";

  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    props: {
      width: Number,
      height: Number,
    },
  })
  export default class Game extends Vue {
    public width: number;
    public height: number;
    public game: Phaser.Game;

    public mounted(): void {
      if (!this.game) {
        this.game = new Phaser.Game(this.$el.clientWidth * window.devicePixelRatio,
          400, Phaser.AUTO, this.$el);
        this.game.state.add("boot", new Boot());
        this.game.state.add("preloader", new Preloader());
        this.game.state.add("main-menu", new MainMenu());
        this.game.state.add("play", new Play());
        this.game.state.start("boot");
      }
    }

    public destroyed(): void {
      this.game.destroy();
    }
  }
</script>
