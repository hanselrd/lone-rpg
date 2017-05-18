import Game from "@/components/Game";
import Home from "@/components/Home";
import Login from "@/components/Login";
import NotFound from "@/components/NotFound";
import Register from "@/components/Register";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      component: Home,
      name: "home",
      path: "/",
    },
    {
      component: Game,
      name: "Game",
      path: "/game",
      props: {
        width: 640,
        height: 480,
      },
    },
    {
      component: Login,
      name: "login",
      path: "/login",
    },
    {
      component: Register,
      name: "register",
      path: "/register",
    },
    {
      component: NotFound,
      name: "notfound",
      path: "*",
    },
  ],
});
