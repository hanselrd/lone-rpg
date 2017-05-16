import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import App from "./app";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

const app = new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
