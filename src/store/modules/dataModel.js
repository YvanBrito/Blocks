import DataModel from "../../utils/DataModel";
import Column from "../../utils/Column";

const state = {
  dataModels: [],
  activeDataModelIndex: -1,
};

const mutations = {
  addDataModel: (state) => {
    state.dataModels.push(new DataModel());
    state.activeDataModelIndex++;
    console.log(state.dataModels);
  },
  removeDataModel: (state, index) => {
    if (
      index === state.activeDataModelIndex &&
      index === state.dataModels.length - 1
    ) {
      state.activeDataModelIndex--;
      console.log("Mudando aqui irmãozinho");
      console.log(state.activeDataModelIndex);
    }

    if (index > -1) {
      state.dataModels.splice(index, 1);
    }
    console.log(state.dataModels);
  },
  addColumnAtDataModelIndex: (state, index) => {
    state.dataModels[index].columns.push(new Column());
    console.log(state.dataModels);
  },
  changeActiveDataModel: (state, index) => {
    state.activeDataModelIndex = Math.min(
      Math.max(index, 0),
      state.dataModels.length
    );
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
  getters,
};
