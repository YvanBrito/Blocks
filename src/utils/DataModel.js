import seedrandom from "seedrandom";

import Column from "./Column";
import helpers from "./helpers";

import RandomUniformGenerator from "./generators/RandomGens/Uniform";
import PoissonTimeGenerator from "./generators/RandomGens/PoissonTime";
import RandomGaussianGenerator from "./generators/RandomGens/Gaussian";
import RandomPoissonGenerator from "./generators/RandomGens/Poisson";
import RandomBernoulliGenerator from "./generators/RandomGens/Bernoulli";
import RandomCauchyGenerator from "./generators/RandomGens/Cauchy";
import RandomCategorical from "./generators/RandomGens/Categorical";
import RandomCategoricalQtt from "./generators/RandomGens/CategoricalQuantity";
import RandomWeightedCategorical from "./generators/RandomGens/WeightedCategorical";

import Generator from "./generators/Generator";
import FunctionGenerator from "./generators/Function";
import SwitchCaseFunction from "./generators/SwitchCaseFunction";
import Random from "./generators/Random";

export default class DataModel {
  constructor() {
    this.name = "Model";
    this.n_lines = 100; // Quantidade de linhas na geração
    this.step_lines = 10000;
    this.n_sample_lines = 100;
    this.save_as = "csv";
    this.header = true;
    this.header_type = true;
    const column = new Column("Dimension 1");
    this.columns = [column];
    this.iterator = { hasIt: false };
    this.ID = "MODEL_" + helpers.uniqueID();
    this.columnsCounter = 1; //If delete a not last column, the new colum will the same name as the last but one column and this make the preview have a bug.
    this.filePath = undefined;
    this.datagenChange = false;
    this.seed = false;
    this.memento = {
      index: 0,
      snapshot: [this.exportModel()],
    };

    // for (let attr in DataModel.listOfGens) {
    //   if (Object.prototype.hasOwnProperty.call(DataModel.listOfGens, attr))
    //     DataModel.listOfGensComplete[attr] = DataModel.listOfGens[attr];
    // }
  }

  get configs() {
    return {
      n_lines: this.n_lines,
      n_sample_lines: this.n_sample_lines,
      save_as: this.save_as,
      header: this.header,
      header_type: this.header_type,
      seed: this.seed || "",
      iterator: this.iterator,
    };
  }

  set configs(obj) {
    if (obj.n_lines) this.n_lines = obj.n_lines;
    if (obj.n_sample_lines) this.n_sample_lines = obj.n_sample_lines;
    if (obj.save_as) this.save_as = obj.save_as;
    if (typeof obj.header === "boolean") this.header = obj.header;
    if (typeof obj.header_type === "boolean")
      this.header_type = obj.header_type;
    if (typeof obj.seed === "string" && obj.seed !== "") this.seed = obj.seed;
    else this.seed = undefined;
    if (obj.iterator) {
      let found = false;
      findGen_block: {
        for (let col of this.columns) {
          if (col.ID === obj.iterator.generatorIt.colID) {
            for (let gen of col.generator.getFullGenerator()) {
              if (gen.ID === obj.iterator.generatorIt.genID) {
                obj.iterator.generator = gen;
                found = true;
                break findGen_block;
              }
            }
          }
        }
      }
      if (found) this.iterator = obj.iterator;
    }
  }

  getColumnsNames() {
    let names = [];
    for (let col of this.columns) {
      names.push(col.name);
    }
    return names;
  }

  getDisplayedColumnsNames() {
    let names = [];
    for (let col of this.columns) {
      if (col.display) names.push(col.name);
    }
    return names;
  }

  addColumn(name, generator) {
    generator = generator || new RandomUniformGenerator();
    let column = new Column(name, generator);
    this.columns.push(column);
  }

  changeGeneratorToIndex(index, gen, order) {
    if (order === 0) this.columns[index].generator = gen;
    else this.columns[index].generator.changeGenerator(gen, order);
  }

  addGeneratorToIndex(index, gen) {
    this.columns[index].generator.addGenerator(gen);
  }

  removeLastGenerator(index) {
    this.columns[index].generator.removeLastGenerator();
  }

  removeColumn(index) {
    let removeFunc = (g) => {
      // if (g instanceof FunctionGenerator) {
      //   if (g.inputGenIndex > index) {
      //     g.inputGenIndex--;
      //   } else if (g.inputGenIndex === index) {
      //     g.inputGenIndex = undefined;
      //     g.inputGenerator = undefined;
      //   }
      // }
      if (g.type === "SwitchCaseFunction") {
        for (let child in g.listOfGenerators) {
          if (Object.prototype.hasOwnProperty.call(g.listOfGenerators, child)) {
            removeFunc(g.listOfGenerators[child]);
          }
        }
      }
    };

    if (index > -1) this.columns.splice(index, 1);

    //Atualiza o indexOfGens de todos as Function que estejam em colunas depois
    for (let i = index; i < this.columns.length; i++) {
      let gens = this.columns[i].generator.getFullGenerator();

      for (let g of gens) {
        removeFunc(g);
      }
    }
  }

  generateSample() {
    let lb = this.n_lines;
    let sb = this.save_as;
    let hb = this.header;
    this.n_lines = this.n_sample_lines;
    this.save_as = "csv";
    this.header = true;
    let sampleData = this.generate();
    this.n_lines = lb;
    this.save_as = sb;
    this.header = hb;
    return sampleData;
  }

  generate(quantity = NaN) {
    //TODO: pedir uma quantidade exata de dados para serem gerados e associar isso com as configurações ao lado do Generate na Tela Inicial.
    //Troca entre gerador aleatório com ou sem semente.
    if (this.seed) seedrandom(this.seed, { global: true });

    let data = [];
    const numberLines = Number(quantity)
      ? quantity > this.step_lines
        ? this.step_lines
        : quantity
      : this.n_lines;

    for (let i = 0; i < numberLines; i++) {
      data.push(this.save_as === "json" && !this.header ? [] : {});
      for (let j = 0; j < this.columns.length; j++) {
        if (this.columns[j].display) {
          if (this.save_as === "json" && !this.header) {
            data[i].push(this.columns[j].generator.generate());
          } else {
            data[i][this.columns[j].name] =
              this.columns[j].generator.generate();
          }
        }
      }
    }
    this.resetAll();
    return data;
  }

  resetAll() {
    for (let j = 0; j < this.columns.length; j++) {
      this.columns[j].generator.reset();
    }
  }

  exportModel() {
    let model = {
      name: this.name,
      generator: [],
      n_lines: this.n_lines,
      step_lines: this.step_lines,
      columnsCounter: this.columnsCounter,
      save_as: this.save_as,
      header: this.header,
      header_type: this.header_type,
      seed: this.seed || "",
    };
    for (let i = 0; i < this.columns.length; i++) {
      model.generator.push({
        name: this.columns[i].name,
        type: this.columns[i].type,
        ID: this.columns[i].ID,
        display: this.columns[i].display,
      });
      let fullGenerator = [];
      let fullGenNames = [];
      this.columns[i].generator.getFullGenerator(fullGenerator);
      for (let gen of fullGenerator) {
        fullGenNames.push(gen.getModel());
      }
      model.generator[i].generator = fullGenNames;
    }
    return JSON.stringify(model);
  }

  //TODO: resolver funções e ruido.
  importModel(model_str, resetColumns) {
    let model = JSON.parse(model_str);
    if (model.generator[0].generator[0].name === "Real Data Wrapper") {
      throw new Error("Real Data Wrapper is strange!");
    }
    this.name = model.name || this.name;
    this.n_lines = model.n_lines || this.n_lines;
    this.step_lines = model.step_lines || this.step_lines;
    this.columnsCounter = model.columnsCounter;
    this.save_as = model.save_as || this.save_as;
    this.header = model.header || this.header;
    this.header_type = model.header_type || this.header_type;
    if (typeof model.seed === "string" && model.seed !== "")
      this.seed = model.seed;

    if (resetColumns) this.columns = [];

    for (let i = 0; i < model.generator.length; i++) {
      let generator;
      for (let j = 0; j < model.generator[i].generator.length; j++) {
        let selectedGenerator =
          DataModel.listOfGens[model.generator[i].generator[j].name];
        if (generator) {
          let newgen = new selectedGenerator();
          generator.addGenerator(newgen);
          helpers.copyAttrs(model.generator[i].generator[j], newgen, this);
        } else {
          generator = new selectedGenerator();
          helpers.copyAttrs(model.generator[i].generator[j], generator, this);
        }
      }

      generator.reset();
      let col = new Column(model.generator[i].name, generator);
      col.ID = model.generator[i].ID || col.ID;
      col.display =
        model.generator[i].display === undefined
          ? col.display
          : model.generator[i].display;
      this.columns.push(col);
    }
  }

  saveState() {
    if (this.memento.index !== this.memento.snapshot.length - 1) {
      let remove = this.memento.snapshot.length - (this.memento.index + 1);
      this.memento.snapshot.splice(this.memento.index + 1, remove);
    }
    if (this.memento.snapshot.length === 500) {
      this.memento.snapshot.pop(0);
    } else {
      this.memento.index++;
    }
    this.memento.snapshot.push(this.exportModel());
    //console.log(this.memento,"State");
  }

  forward() {
    if (this.memento.index !== this.memento.snapshot.length - 1) {
      this.importModel(this.memento.snapshot[++this.memento.index], true);
      //console.log(this.memento,"Forward");
    }
  }

  restore() {
    if (this.memento.index !== 0) {
      this.importModel(this.memento.snapshot[--this.memento.index], true);
      //console.log(this.memento,"Restore");
    }
  }

  exportDot() {
    function drawGenerators(ref, col, i, pkey) {
      let fullListOfGens = [];
      col.generator.getFullGenerator(fullListOfGens);
      for (let j = 0; j < fullListOfGens.length; j++) {
        let params = fullListOfGens[j].getGenParams();
        ref.str +=
          "col_" +
          i +
          "_" +
          col.name.replace(/\s+/g, "_") +
          "_" +
          fullListOfGens[j].name.replace(/\s+/g, "_") +
          "_" +
          j +
          ' [label=< <table border="0" cellborder="0"><tr><td align="center"><B><FONT point-size="14">' +
          fullListOfGens[j].name +
          "</FONT></B></td></tr>";

        for (let param of params) {
          if (param.type === "array" || param.type === "numarray") {
            ref.str +=
              '<tr><td align="left">&#8226; ' +
              param.shortName +
              " = &#91;</td></tr>";
            for (let arrItem of fullListOfGens[j][param.variableName])
              ref.str += '<tr><td align="left">' + arrItem + ",</td></tr>";
            ref.str += '<tr><td align="left">&#93;</td></tr>';
          } else if (param.type === "Generator") {
            ref.str +=
              '<tr><td align="left">&#8226; ' +
              param.shortName +
              " = generator(" +
              fullListOfGens[j][param.variableName].name +
              ")</td></tr>";
          } else if (param.type.indexOf("Column") >= 0) {
            ref.str +=
              '<tr><td align="left">&#8226; ' +
              param.shortName +
              " = column(" +
              fullListOfGens[j][param.variableName].parent.name +
              ")</td></tr>";
          } else {
            ref.str +=
              '<tr><td align="left">&#8226; ' +
              param.shortName +
              " = " +
              fullListOfGens[j][param.variableName] +
              "</td></tr>";
          }
        }
        ref.str += "</table> >] ; \n";

        if (fullListOfGens[j].type === "SwitchCaseFunction") {
          for (let key in fullListOfGens[j].listOfGenerators) {
            if (
              Object.prototype.hasOwnProperty.call(
                fullListOfGens[j].listOfGenerators,
                key
              )
            ) {
              // str += "col_"+i+"_"+fullListOfGens[j].name.replace(/\s+/g,"_")+"_child_"+key.replace(/\s+/g,"_").replace(/\W+/g,"")
              //     + ' [label=< <B><FONT point-size="14">'+fullListOfGens[j].listOfGenerators[key].name+'</FONT></B> >]\n';
              let keyForID =
                (pkey ? pkey + "_" : "") +
                key
                  .replace("<", "lt")
                  .replace(">", "gt")
                  .replace(/\s+/g, "_")
                  .replace(/\W+/g, "");
              let refobj = { str: ref.str, edges: ref.edges };
              drawGenerators(
                refobj,
                {
                  name: "child_" + keyForID,
                  generator: fullListOfGens[j].listOfGenerators[key],
                },
                i,
                (pkey ? pkey + "_" : "") + j
              );
              ref.str = refobj.str;
              ref.edges = refobj.edges;
              ref.edges +=
                "col_" +
                i +
                "_" +
                col.name.replace(/\s+/g, "_") +
                "_" +
                fullListOfGens[j].name.replace(/\s+/g, "_") +
                "_" +
                j +
                " -> " +
                "col_" +
                i +
                "_" +
                "child_" +
                keyForID +
                "_" +
                fullListOfGens[j].listOfGenerators[key].name.replace(
                  /\s+/g,
                  "_"
                ) +
                "_0" +
                '[label="case: ' +
                key +
                '"]; \n';
            }
          }
          break;
        } else {
          if (fullListOfGens[j + 1])
            ref.edges +=
              "col_" +
              i +
              "_" +
              col.name.replace(/\s+/g, "_") +
              "_" +
              fullListOfGens[j].name.replace(/\s+/g, "_") +
              "_" +
              j +
              " -> " +
              "col_" +
              i +
              "_" +
              col.name.replace(/\s+/g, "_") +
              "_" +
              fullListOfGens[j + 1].name.replace(/\s+/g, "_") +
              "_" +
              (j + 1) +
              "; \n";
        }
      }
    }

    let str =
      'digraph { \n node [shape=box,fontsize=12,fontname="Verdana"];\n graph [fontsize=12,fontname="Verdana",compound=true]; \n';
    let edges = "";
    for (let i = 0; i < this.columns.length; i++) {
      let col = this.columns[i];
      str +=
        "col_" +
        i +
        "_" +
        col.name.replace(/\s+/g, "_") +
        ' [label=< <table border="0" cellborder="0"><tr><td align="center"><B><FONT point-size="14">' +
        col.name +
        '</FONT></B></td></tr><tr><td align="left">&#8226; type = "' +
        col.type +
        '"</td></tr></table> > ]; \n';
    }
    str += "\n";
    for (let i = 0; i < this.columns.length; i++) {
      let col = this.columns[i];

      edges +=
        "col_" +
        i +
        "_" +
        col.name.replace(/\s+/g, "_") +
        "-> col_" +
        i +
        "_" +
        col.name.replace(/\s+/g, "_") +
        "_" +
        col.generator.name.replace(/\s+/g, "_") +
        "_" +
        0 +
        " [lhead=" +
        "cluster_" +
        i +
        "_" +
        col.name.replace(/\s+/g, "_") +
        ',minlen="2"] ; \n';
      str +=
        "subgraph cluster_" + i + "_" + col.name.replace(/\s+/g, "_") + " { \n";
      str += 'label="List of Generators";\n';
      let refobj = { str, edges };
      drawGenerators(refobj, col, i);
      str = refobj.str;
      edges = refobj.edges;
      str += "} \n\n";
    }

    str += edges + "\n";

    str += "}";
    return str;
  }

  findGenByID(ID) {
    let dfs = (gen) => {
      let full_gen = gen.getFullGenerator();

      for (let j = 0; j < full_gen.length; j++) {
        console.log(full_gen[j].ID, ID);
        if (full_gen[j].ID === ID) return full_gen[j];

        if (full_gen[j].type === "SwitchCaseFunction") {
          for (let attr in full_gen[j].listOfGenerators) {
            if (
              Object.prototype.hasOwnProperty.call(
                full_gen[j].listOfGenerators,
                attr
              )
            ) {
              let found = dfs(full_gen[j].listOfGenerators[attr]);
              if (found) return found;
            }
          }
        }
      }
    };
    for (let i = 0; i < this.columns.length; i++) {
      let found = dfs(this.columns[i].generator);
      if (found) return found;
    }
  }

  static listOfGens = {
    "Poisson Time Generator": PoissonTimeGenerator,
    "Uniform Generator": RandomUniformGenerator,
    "Gaussian Generator": RandomGaussianGenerator,
    "Poisson Generator": RandomPoissonGenerator,
    "Bernoulli Generator": RandomBernoulliGenerator,
    "Cauchy Generator": RandomCauchyGenerator,
    Categorical: RandomCategorical,
    "Categorical Quantity": RandomCategoricalQtt,
    "Weighted Categorical": RandomWeightedCategorical,
    // "Constant Value": ConstantValue,
    // "Missing Value": MCAR,
    // MCAR: MCAR,
    // MNAR: MNAR,
    // "Fixed Time Generator": FixedTimeGenerator,
    // "Noise Generator": RandomNoiseGenerator,
    // "Constant Noise Generator": RandomConstantNoiseGenerator,
    // "Range Filter": RangeFilter,
    // "Linear Scale": LinearScale,
    // "No Repeat": NoRepeat,
    // MinMax: MinMax,
    // NumberFormat: NumberFormat,
    // "Low-Pass Filter": LowPassFilter,
    // "Weighted Categorical": RandomWeightedCategorical,
    // "Linear Function": LinearFunction,
    // "Quadratic Function": QuadraticFunction,
    // "Polynomial Function": PolynomialFunction,
    // "Exponential Function": ExponentialFunction,
    // "Logarithm Function": LogarithmFunction,
    // "Sinusoidal Function": SinusoidalFunction,
    // "Categorical Function": CategoricalFunction,
    // "Piecewise Function": PiecewiseFunction,
    // "TimeLaps Function": TimeLapsFunction,
    // "Sinusoidal Sequence": SinusoidalSequence,
    // "Custom Sequence": CustomSequence,
    // "CubicBezier Generator": CubicBezierGenerator,
    // "Path2D Stroke Generator": Path2DStrokeGenerator,
    // "Path2D Fill Generator": Path2DFillGenerator,
    // "Get Extra Value": GetExtraValue,
  };

  static listOfGensHelp = {
    "Poisson Time Generator": PoissonTimeGenerator,
    "Uniform Generator": "Generate random data distributed evenly.",
    "Gaussian Generator": RandomGaussianGenerator,
    "Poisson Generator": RandomPoissonGenerator,
    "Bernoulli Generator": RandomBernoulliGenerator,
    "Cauchy Generator": RandomCauchyGenerator,
    Categorical: "Generate random data using names.",
    "Categorical Quantity":
      "Almost the same as Categorical, but each name have a fixed quantity.",
    // "Constant Value": "Generate a sequence with only one constant number.",
    // MCAR: "[Use at left] Introduce values Missing Completely At Random.",
    // MAR: "[Use at left] Introduce values Missing At Random.",
    // MNAR: "[Use at left] Introduce values Missing Not At Random.",
    // "Counter Generator":
    //   "Generate a sequence counting Step by Step from Begin.",
    // "Fixed Time Generator": FixedTimeGenerator,
    // "Noise Generator": RandomNoiseGenerator,
    // "Constant Noise Generator": RandomConstantNoiseGenerator,
    // "Range Filter": RangeFilter,
    // "Linear Scale": LinearScale,
    // "No Repeat": "Generate distinct values.",
    // MinMax: MinMax,
    // "Number Format": "Format the number from generators",
    // "Low-Pass Filter": LowPassFilter,
    // "Weighted Categorical":
    //   "Almost the same as Categorical, but the names have probability to appear.",
    // "Linear Function": LinearFunction,
    // "Quadratic Function": QuadraticFunction,
    // "Polynomial Function": PolynomialFunction,
    // "Exponential Function": ExponentialFunction,
    // "Logarithm Function": LogarithmFunction,
    // "Sinusoidal Function": SinusoidalFunction,
    // "Categorical Function": "Using categorical inputs to generate values.",
    // "Piecewise Function": PiecewiseFunction,
    // "TimeLaps Function": TimeLapsFunction,
    // "Sinusoidal Sequence": "Generate values in a sinusoidal sequence.",
    // "Custom Sequence": "Generate values using a custom sequence.",
    // "CubicBezier Generator": CubicBezierGenerator,
    // "Path2D Stroke Generator": Path2DStrokeGenerator,
    // "Get Extra Value":
    //   "Useful for generators the return multidimensional values.",
    // "Real Data Wrapper": "Generator to receice data from real dataset.",
  };

  // static listOfGensForNoise = {
  //   "Uniform Generator": RandomGens.RandomUniformGenerator,
  //   "Gaussian Generator": RandomGens.RandomGaussianGenerator,
  //   "Poisson Generator": RandomGens.RandomPoissonGenerator,
  //   "Bernoulli Generator": RandomGens.RandomBernoulliGenerator,
  //   "Cauchy Generator": RandomGens.RandomCauchyGenerator,
  // };

  // static listOfGensComplete = {
  //   "Real Data Wrapper": RealDataWrapper,
  // };

  static superTypes = {
    Generator,
    FunctionGenerator,
    SwitchCaseFunction,
    Random,
    Column,
    // Sequence,
    // Accessory,
    // Geometric,
  };

  static Utils = {
    decodeSvgPathD: (str) => {
      let commands = str.match(/[ACLMZaclmz][^ACLMZaclmz]*/g);
      let params, quant;
      let lastPoint = [0, 0];
      let output = [];
      let init = [0, 0];

      for (let c of commands) {
        switch (c[0]) {
          case "A":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            output.push({
              command: "A",
              params: [
                +params[0],
                +params[1],
                +params[2],
                +params[3],
                +params[4],
                +params[5],
                +params[6],
              ],
            });
            break;
          case "M":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            if (params.length > 2) {
              init[0] = lastPoint[0] = +params.shift();
              init[1] = lastPoint[1] = +params.shift();
              output.push({
                command: "M",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            quant = params.length / 2;
            for (let i = 0; i < quant; i++) {
              lastPoint[0] = +params[i * 2];
              lastPoint[1] = +params[i * 2 + 1];
              output.push({
                command: "L",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            break;

          case "m":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            if (params.length > 2) {
              init[0] = lastPoint[0] += +params.shift();
              init[1] = lastPoint[1] += +params.shift();
              output.push({
                command: "M",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            quant = params.length / 2;
            for (let i = 0; i < quant; i++) {
              lastPoint[0] += +params[i * 2];
              lastPoint[1] += +params[i * 2 + 1];
              output.push({
                command: "L",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            break;

          case "L":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            quant = params.length / 2;
            for (let i = 0; i < quant; i++) {
              lastPoint[0] = +params[i * 2];
              lastPoint[1] = +params[i * 2 + 1];
              output.push({
                command: "L",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            break;

          case "l":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            quant = params.length / 2;
            for (let i = 0; i < quant; i++) {
              lastPoint[0] += +params[i * 2];
              lastPoint[1] += +params[i * 2 + 1];
              output.push({
                command: "L",
                params: [lastPoint[0], lastPoint[1]],
              });
            }
            break;

          case "C":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            quant = params.length / 6;
            for (let i = 0; i < quant; i++) {
              let x1 = +params[i * 6],
                y1 = +params[i * 6 + 1];
              let x2 = +params[i * 6 + 2],
                y2 = +params[i * 6 + 3];
              let x3 = +params[i * 6 + 4],
                y3 = +params[i * 6 + 5];
              output.push({ command: "C", params: [x1, y1, x2, y2, x3, y3] });
              lastPoint[0] = x3;
              lastPoint[1] = y3;
            }
            break;
          case "c":
            params = c
              .substring(1)
              .trim()
              .split(/[,\s]+/);
            quant = params.length / 6;
            for (let i = 0; i < quant; i++) {
              let x1 = lastPoint[0] + +params[i * 6],
                y1 = lastPoint[1] + +params[i * 6 + 1];
              let x2 = x1 + +params[i * 6 + 2],
                y2 = y1 + +params[i * 6 + 3];
              let x3 = x2 + +params[i * 6 + 4],
                y3 = y2 + +params[i * 6 + 5];
              output.push({ command: "C", params: [x1, y1, x2, y2, x3, y3] });
              lastPoint[0] = x3;
              lastPoint[1] = y3;
            }
            break;

          case "z":
          case "Z":
            output.push({ command: "Z", params: [init[0], init[1]] });
            lastPoint[0] = init[0];
            lastPoint[1] = init[1];
            break;
        }
      }

      return output;
    },
  };
}
