import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      count: 0,
      msg:"Hola Mundo!! ---- viejo",
      welcome:"Bienvenido Rey Cabro"
    },
    mutations: {
      increment(state) {
        state.count++;
      },
    },
  });

export default store;