<template>
  <div class="game"></div>
</template>

<script lang="ts">
  import "pixi";
  import "p2";
  import "phaser";

  import Boot from "@/game/states/boot";
  //import Preloader from "@/game/states/preloader";
  //import MainMenu from "@/game/states/main-menu";
  //import Play from "@/game/states/play";

  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "Game"
  })

  export default class Game extends Vue {
    game: Phaser.Game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
          window.innerHeight * devicePixelRatio, Phaser.AUTO, this.$el);

    created() {
      if (this.game !== null) {
        this.game.state.add("Boot", new Boot());
        //this.game.state.add("Preloader", new Preloader());
        //this.game.state.add("MainMenu", new MainMenu());
        //this.game.state.add("Play", new Play());
        this.game.state.start("Boot");
      }
    }

    destroyed() {
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
