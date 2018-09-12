import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isUserLoggedIn: false,
    token: null,
    user: {}
  },
  mutations: {
    setUser(store, payload) {
      this.state.user = payload;
    },
    setToken(store, payload) {
      this.state.token = payload;
      this.state.isUserLoggedIn = true;
    },
    logout() {
      this.state.isUserLoggedIn = false;
      this.state.user = {};
      this.state.token = null;
    },
    setStoreState(store, payload) {
      this.state.isUserLoggedIn = payload.isUserLoggedIn;
      this.state.user = payload.user;
      this.state.token = payload.token
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
      return true;
    },
    setToken(context, payload) {
      context.commit("setToken", payload);
    },
    logout(context) {
      context.commit("logout");
    },
    setStoreState(context, payload) {
      context.commit("setStoreState", payload)
    }
  }
});
