import Vue from "vue";
import Vuex from "vuex";

import dataModel from "./modules/dataModel";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dataModel,
  },
});
