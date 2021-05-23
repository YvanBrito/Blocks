export default {
  uniqueID() {
    return ((Math.random() * Date.now()) / Math.random()).toString(36);
  },
};
