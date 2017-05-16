import Game from "@/components/game";
// import Hello from "@/components/hello";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      component: Game,
      path: "/game",
      props: {
        width: 640,
        height: 480,
      },
    },
  ],
});
