import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "font-awesome/css/font-awesome.css";

import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
