import DataGen from "./DataModel";
export default {
  uniqueID() {
    return ((Math.random() * Date.now()) / Math.random()).toString(36);
  },

  copyAttrs(source, target, context) {
    for (let attr in source) {
      if (
        Object.prototype.hasOwnProperty.call(source, attr) &&
        attr !== "name"
      ) {
        if (attr === "generator2") {
          target[attr] = new DataGen.listOfGens[source[attr].name]();
        } else if (attr === "inputGenIndex") {
          if (context.columns[source[attr]]) {
            target.inputGenerator = context.columns[source[attr]].generator;
            target[attr] = source[attr];
          }
        } else if (attr === "listOfGenerators") {
          target[attr] = {};
          for (let attr2 in source[attr]) {
            if (Object.prototype.hasOwnProperty.call(source[attr], attr2)) {
              for (let genObj of source[attr][attr2]) {
                //Resolve os filhos
                console.log(genObj.name);
                let gen1 = new DataGen.listOfGens[genObj.name]();

                if (target[attr][attr2]) {
                  target[attr][attr2].addGenerator(gen1);
                  // gen1.parent = target;
                } else {
                  target[attr][attr2] = gen1;
                  target[attr][attr2].parent = target;
                }
                this.copyAttrs(genObj, gen1, context);
              }
            }
          }
        } else {
          target[attr] = source[attr];
        }
      }
    }
  },
};
