// backend/patterns/templateMethod/ComboTemplate.js

class ComboTemplate {
  constructor() {
    this.descripcion = [];
    this.precio = 0;
  }

  crearCombo() {
    this.agregarItems();
    return {
      descripcion: this.descripcion.join(' + '),
      precio: this.precio,
    };
  }

  agregarItems() {
    throw new Error("Método agregarItems() debe ser implementado");
  }

  agregarItem(nombre, precio) {
    this.descripcion.push(nombre);
    this.precio += precio;
  }
}

module.exports = ComboTemplate;
