import RandomUniformGenerator from "./generators/RandomGens/Uniform";
import helpers from "./helpers";

export default class Column {
  constructor(name, generator) {
    this.name = name || "Col";
    this.generator = generator || new RandomUniformGenerator();
    this.type = this.generator.getReturnedType();
    this.ID = "COL_" + helpers.uniqueID();
    this.generator.parent = this;
    this.display = true;
  }
}
