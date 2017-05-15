import Game from "@/components/game";
import Hello from "@/components/hello";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: Hello,
      name: "Hello",
      path: "/",
    },
    {
      component: Game,
      name: "Game",
      path: "/game",
    },
  ],
});
