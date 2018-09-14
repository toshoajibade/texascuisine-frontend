import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from 'vuex-router-sync'
import "./registerServiceWorker";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
// index.js or main.js
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
const unsync = sync(store, router)
unsync()
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");
