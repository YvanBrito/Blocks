import DataModel from "../../utils/DataModel";

const state = {
  dataModels: [],
};

const mutations = {
  addDataModel: (state) => {
    state.dataModels.push(new DataModel());
    console.log(state.dataModels);
  },
  removeDataModel: (state) => {
    state.dataModels.pop();
    console.log(state.dataModels);
  },
};

const getters = {
  dataModels: (state) => {
    return state.dataModels;
  },
};

export default {
  state,
  mutations,
  getters,
};
