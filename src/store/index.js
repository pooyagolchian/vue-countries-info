import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "countries",
});

export default new Vuex.Store({
  strict: true,
  plugins: [vuexLocalStorage.plugin],
  state: {
    countries: [],
  },
  mutations: {
    setData(state, payload) {
      state.countries = payload;
    },
  },
  actions: {
    async getData({ commit }, payload) {
      commit("setData", payload);
    },
  },
  getters: {
    countries: (state) => {
      return state.countries;
    },
  },
});
