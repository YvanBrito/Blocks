import Random from "../Random";
import randgen from "randgen";

export default class RandomUniformGenerator extends Random {
  constructor(min, max, disc) {
    super("Uniform Generator");
    this.min = min || 0;
    this.max = max || 1;
    this.disc = disc || false;
  }

  generate() {
    let v = randgen.runif(this.min, this.max, this.disc);
    return super.generate(v);
  }

  getGenParams() {
    let params = super.getGenParams();
    params.push(
      {
        shortName: "Min",
        variableName: "min",
        name: "Minimum value",
        type: "number",
      },
      {
        shortName: "Max",
        variableName: "max",
        name: "Maximum value",
        type: "number",
      },
      {
        shortName: "Disc",
        variableName: "disc",
        name: "Discrete Values",
        type: "boolean",
      }
    );
    return params;
  }

  getModel() {
    let model = super.getModel();
    model.min = this.min;
    model.max = this.max;
    model.disc = this.disc;
    return model;
  }

  copy() {
    let newGen = new RandomUniformGenerator(this.min, this.max, this.disc);
    if (this.generator) {
      newGen.addGenerator(this.generator.copy(), this.order);
    }
    return newGen;
  }
}
