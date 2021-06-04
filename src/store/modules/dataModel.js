import DataModel from "../../utils/DataModel";
import Column from "../../utils/Column";

const state = {
  dataModels: [],
  activeDataModelIndex: -1,
};

const mutations = {
  addDataModel: (state) => {
    state.dataModels.push(new DataModel());
    state.activeDataModelIndex = state.dataModels.length - 1;
  },
  removeDataModel: (state, index) => {
    if (index > -1 && index < state.dataModels.length) {
      state.dataModels.splice(index, 1);
    }
  },
  addColumnAtDataModelIndex: (state, index) => {
    state.dataModels[index].columns.push(new Column());
  },
  changeActiveDataModel: (state, index) => {
    state.activeDataModelIndex = Math.min(
      Math.max(index, 0),
      state.dataModels.length
    );
  },
};

const actions = {
  closeDataModel: ({ commit, state }, index) => {
    commit("removeDataModel", index);
    if (
      index === state.activeDataModelIndex ||
      index < state.activeDataModelIndex
    ) {
      commit("changeActiveDataModel", --state.activeDataModelIndex);
    }
  },
};

const getters = {
  dataModels: (state) => {
    return state.dataModels;
  },
  activeDataModelIndex: (state) => {
    return state.activeDataModelIndex;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
