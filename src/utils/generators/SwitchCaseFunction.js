import Function from "./Function";
import RandomUniformGenerator from "./RandomGens/Uniform";

export default class SwitchCaseFunction extends Function {
  constructor(name, listOfGenerators, inputGenerator, inputGenIndex) {
    super(name, inputGenerator, inputGenIndex);
    this.type = "SwitchCaseFunction";
    this.listOfGenerators = listOfGenerators || {};
    this.inputArray = [];
  }

  reset() {
    //Sempre que ocorre um reset, o switchCaseFunction avalia a lista de input para verificar se essa lista possui valores novos.
    //Se possui valores a mais, são incluidos RandomUniformGenerators, caso possua um input a menos esse é removido.
    super.reset();
    if (!this.inputGenerator || !this.inputArray) return;

    // let auxgen = new RandomUniformGenerator();
    // this.generator = auxgen;
    // auxgen.parent = this;

    let attrs = [];
    this.array = [];
    for (let attr in this.listOfGenerators) {
      if (Object.prototype.hasOwnProperty.call(this.listOfGenerators, attr)) {
        //Todos os geradores são resetados aqui.

        this.listOfGenerators[attr].reset();

        if (this.listOfGenerators[attr].array)
          this.array.push.apply(this.array, this.listOfGenerators[attr].array);

        attrs.push(attr);
      }
    }
    //retorna valores únicos do array
    this.array = [...new Set(this.array)];
    for (let i = 0; i < this.inputArray.length; i++) {
      if (!this.listOfGenerators[this.inputArray[i]]) {
        let gen = new RandomUniformGenerator();
        // auxgen.changeGenerator(gen);
        gen.parent = this;
        this.listOfGenerators[this.inputArray[i]] = gen;
      }
      let index = attrs.indexOf(this.inputArray[i]);
      if (index >= 0) {
        attrs.splice(index, 1);
      }
    }
    for (let attr of attrs) {
      this.listOfGenerators[attr] = undefined;
      delete this.listOfGenerators[attr];
    }
  }

  transform(x) {
    //this.generator = this.listOfGenerators[x];
    return this.listOfGenerators[x].generate();
  }

  getModel() {
    let model = super.getModel();
    model.listOfGenerators = {};
    for (let p in this.listOfGenerators) {
      if (Object.prototype.hasOwnProperty.call(this.listOfGenerators, p)) {
        let fullGen = [];
        this.listOfGenerators[p].getFullGenerator(fullGen);
        model.listOfGenerators[p] = []; //this.listOfGenerators[p].getModel();
        for (let gen of fullGen) {
          model.listOfGenerators[p].push(gen.getModel());
        }
      }
    }
    return model;
  }

  getReturnedType() {
    let outType;
    for (let genName in this.listOfGenerators) {
      //if(this.listOfGenerators.hasOwnProperty(genName)) continue //Faz sentido essa linha?
      if (
        outType &&
        outType !== this.listOfGenerators[genName].getReturnedType()
      )
        return "Mixed";
      outType = this.listOfGenerators[genName].getReturnedType(); //Get last generator type
    }

    return outType ? outType : "Numeric";
  }

  copy() {
    let newList = {};
    //Copia a lista de Geradores
    for (let prop in this.listOfGenerators)
      if (Object.prototype.hasOwnProperty.call(this.listOfGenerators, prop))
        newList[prop] = this.listOfGenerators[prop].copy();

    let newGen = new this.constructor(
      newList,
      this.inputGenerator,
      this.inputGenIndex
    );

    for (let prop in newList)
      if (Object.prototype.hasOwnProperty.call(newList, prop))
        newList[prop].parent = newGen;

    newGen.inputGenerator = this.inputGenerator;
    newGen.inputGenIndex = this.inputGenIndex;

    if (this.generator) {
      newGen.addGenerator(this.generator.copy(), this.order);
    }
    return newGen;
  }

  unlinkChild(child) {
    for (let cat in this.listOfGenerators) {
      if (Object.prototype.hasOwnProperty.call(this.listOfGenerators, cat)) {
        if (this.listOfGenerators[cat] === child) {
          this.listOfGenerators[cat] =
            child.generator || new RandomUniformGenerator();
          this.listOfGenerators[cat].parent = this;
          break;
        }
      }
    }
  }
}
