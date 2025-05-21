// backend/patterns/templateMethod/combosMethod.js
const ComboTemplate = require('./comboTemplate');

class Combo1 extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Palomitas pequeñas", 10000);
    this.agregarItem("Gaseosa pequeña", 10000);
  }
}

class ComboNachos extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Nachos con queso", 12000);
    this.agregarItem("Gaseosa mediana", 10000);
  }
}

class AguaCristal extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Agua Cristal", 8000);
  }
}

class ComboHotDog extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Hot Dog", 11000);
    this.agregarItem("Gaseosa pequeña", 10000);
  }
}

module.exports = {
  Combo1,
  ComboNachos,
  AguaCristal,
  ComboHotDog,
};
