import "@babel/polyfill";
import Vue from "vue";
import VueProgressBar from "vue-progressbar";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import db from "./indexedDB";
import ClickOutside from "vue-click-outside";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

const unsync = sync(store, router);

Vue.prototype.$db = db;

unsync();
Vue.config.productionTip = false;

const options = {
  color: "#bffaf3",
  failedColor: "#fff",
  thickness: "2px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300
  },
  autoRevert: true,
  location: "top",
  inverse: false
};

Vue.use(VueProgressBar, options);

Vue.directive("click-outside", ClickOutside);

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");
