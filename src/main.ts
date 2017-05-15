import Vue from "vue";
import App from "./app";
import router from "./router";

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
