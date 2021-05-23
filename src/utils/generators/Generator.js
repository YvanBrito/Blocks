// import SwitchCaseFunction from "./SwitchCaseFunction";
import RandomUniformGenerator from "./RandomGens/Uniform";
import DataModel from "../DataModel";
import helpers from "../helpers";

export default class Generator {
  constructor(name) {
    this.name = name;
    if (this.type === "SwitchCaseFunction")
      this.operator = Generator.Operators.none;
    this.operator = Generator.Operators.sum;
    this.order = 0;
    this.ID = "GEN_" + helpers.uniqueID();
  }

  static Operators = {
    sum: function sum(a, b) {
      return a + b;
    },
    multiply: function multiply(a, b) {
      return a * b;
    },
    modulus: function modulus(a, b) {
      return a % b;
    },
    divide: function divide(a, b) {
      return a / b;
    },
    subtract: function subtract(a, b) {
      return a - b;
    },
    none: function none(a, b) {
      return b;
    },
  };

  addGenerator(gen) {
    if (this.generator) {
      this.generator.addGenerator(gen);
    } else {
      gen.order = this.order + 1;
      this.generator = gen;
      gen.parent = this;
    }
  }

  sumOrder() {
    if (this.parent instanceof Generator) {
      this.order = this.parent.order + 1;
    } else if (this.parent instanceof DataModel) {
      this.order = 0;
    }
    if (this.type === "SwitchCaseFunction") {
      for (let cat in this.listOfGenerators)
        if (Object.prototype.hasOwnProperty.call(this.listOfGenerators, cat))
          this.listOfGenerators[cat].sumOrder();
    } else if (this.generator) this.generator.sumOrder();
  }

  unlink() {
    if (this.parent) {
      if (this.parent.type === "SwitchCaseFunction") {
        this.parent.unlinkChild(this);
      }
      if (this.generator) {
        this.parent.generator = this.generator;
        this.generator.parent = this.parent;
      } else {
        if (this.parent instanceof DataModel) {
          let newGen = new RandomUniformGenerator();
          this.parent.generator = newGen;
          newGen.parent = this.parent;
        } else {
          this.parent.generator = undefined;
        }
      }
      if (this.parent instanceof DataModel) {
        this.parent.generator.getRootGenerator().sumOrder();
      } else {
        this.parent.getRootGenerator().sumOrder();
      }
    }
  }

  insertGenerator(gen) {
    if (this.generator === gen) return;

    gen.parent = this;

    if (this.generator) {
      this.generator.parent = gen;
      gen.generator = this.generator;
    } else {
      gen.generator = undefined;
    }

    this.generator = gen;
    this.generator.getRootGenerator().sumOrder();
  }

  insertGeneratorBefore(gen) {
    //é filho de SwitchCaseFunction e está na listOfGenerators
    //ou seja não é filho direto e sim da lista de cases
    if (
      this.parent.type === "SwitchCaseFunction" &&
      this.parent.generator !== this
    ) {
      for (let attr in this.parent.listOfGenerators) {
        let genOfList = this.parent.listOfGenerators[attr];
        if (genOfList === this) {
          if (genOfList === gen) return;

          this.parent.listOfGenerators[attr] = gen;

          gen.parent = genOfList.parent;
          gen.generator = genOfList;

          genOfList.parent = gen;
          break;
        }
      }
    } else if (this.parent instanceof Generator) {
      this.parent.insertGenerator(gen);
      return;
    } else {
      this.parent.generator = gen;

      gen.parent = this.parent;
      gen.generator = this;

      this.parent = gen;
    }
    this.getRootGenerator().sumOrder();
  }

  getRootGenerator() {
    let gen = this;
    if (this.parent instanceof Generator) gen = this.parent.getRootGenerator();
    return gen;
  }

  /**
   * Troca o gerador atual na cadeia pelo gerador passado por parâmentro.
   * O gerador que foi chamada o método sairá da sua cadeia de geradores.
   * @param gen O gerador que assumirá o lugar do gerador que foi chamada o método.
   */
  changeGenerator(gen) {
    gen.order = this.order;
    if (this.parent) {
      gen.parent = this.parent;
      this.parent.generator = gen;
    }

    gen.generator = this.generator;
    if (gen.generator) gen.generator.parent = gen;

    if (gen.parent.type === "SwitchCaseFunction") {
      for (let cat in gen.parent.listOfGenerators) {
        if (
          Object.prototype.hasOwnProperty.call(
            gen.parent.listOfGenerators,
            cat
          ) &&
          gen.parent.listOfGenerators[cat] === this
        ) {
          gen.parent.listOfGenerators[cat] = gen;
        }
      }
    }
  }

  removeLastGenerator() {
    if (!this.generator) return;

    if (!this.generator.generator) {
      let removed = this.generator;
      this.generator = undefined;
      return removed;
    } else {
      return this.generator.removeLastGenerator();
    }
  }

  /*Entrada: generators - Lista com as referências dos geradores alocados neste Generator
   *Pega as referências de todos os Generators dentro deste Generator, de forma recursiva, alocando-as em uma lista*/
  getFullGenerator(generators) {
    if (Array.isArray(generators)) {
      generators.push(this);
      if (this.generator) this.generator.getFullGenerator(generators);
    } else {
      let array = [];
      this.getFullGenerator(array);
      return array;
    }
  }

  /**
   * Entrada: sub_value - valor que será combinado com o gerado através (ou não) de um operador
   * Saída: lastGenerated - valor gerado pelo Generator
   * Recebe um valor que é inserido no operador juntamente com um segundo valor gerado pelo Generator inserido neste.
   * Caso não exista um operador, o valor inserido é somado ao valor gerado e retornado
   */
  generate(sub_value) {
    if (this.generator && this.operator) {
      return (this.lastGenerated = this.operator(
        sub_value,
        this.generator.generate()
      ));
    }
    return (this.lastGenerated = sub_value);
  }

  getGenParams() {
    return [
      {
        shortName: "Operator",
        variableName: "accessOperator",
        name: "The operator between this value and right generator value",
        type: "options",
        options: ["sum", "multiply", "modulus", "divide", "subtract", "none"],
      },
    ];
  }

  set accessOperator(operator) {
    this.operator = Generator.Operators[operator];
  }

  get accessOperator() {
    return this.operator.name;
  }

  reset() {
    if (this.generator) this.generator.reset();
  }

  /**
   * Retorna o gerador com seus parâmetros para ser serializado pelo JSON.stringify().
   * Ou seja, sem funções e referências a outros objetos.
   * Este método deve ser sobreposto nas subclasses para persistência das variáveis específicas de cada subtipo
   * de gerador.
   *
   * @returns object - Objeto do gerador pronto para serialização via JSON.stringify().
   */
  getModel() {
    return {
      name: this.name,
      order: this.order,
      ID: this.ID,
      accessOperator: this.accessOperator,
    };
  }

  getReturnedType() {
    return "Numeric";
  }
}
