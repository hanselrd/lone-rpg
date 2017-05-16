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

  @Component({})
  export default class Game extends Vue {
    public game: Phaser.Game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
          window.innerHeight * devicePixelRatio, Phaser.AUTO, this.$el);

    public mounted(): void {
      if (this.game !== null) {
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

<style lang="scss" scoped>
  #game {
    margin: 0 auto;
  }

  #game canvas {
    display: block;
    margin: 0 auto;
  }
</style>
