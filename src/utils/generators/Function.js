import Generator from "./Generator.js";

export default class FunctionGenerator extends Generator {
  constructor(name, inputGenerator, inputGenIndex) {
    super(name);
    this.inputGenerator = inputGenerator;
    this.inputGenIndex = inputGenIndex;
  }

  generate() {
    let value = this.transform(this.inputGenerator.lastGenerated);
    return super.generate(value);
  }

  transform(x) {
    return x;
  }

  getGenParams() {
    let params = super.getGenParams();
    params.push({
      shortName: "Input",
      variableName: "inputGenerator",
      name: "Input Column (Previous one)",
      type: "NumericColumn",
    });
    return params;
  }

  getModel() {
    let model = super.getModel();
    model.inputGenIndex = this.inputGenIndex;
    return model;
  }

  copy() {
    let newGen = new this.constructor(this.inputGenerator);
    if (this.generator) {
      newGen.addGenerator(this.generator.copy(), this.order);
    }
    newGen.inputGenerator = this.inputGenerator;
    newGen.inputGenIndex = this.inputGenIndex;
    return newGen;
  }
}
