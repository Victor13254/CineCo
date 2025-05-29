class ComboTemplate {
  constructor() {
    this.descripcion = [];
    this.precio = 0;
    this.imagen = ''; 
  }

  crearCombo() {
    this.agregarItems();
    return {
      descripcion: this.descripcion.join(' + '),
      precio: this.precio,
      imagen: this.imagen, 
    };
  }

  agregarItems() {
    throw new Error("Método agregarItems() debe ser implementado");
  }

  agregarItem(nombre, precio) {
    this.descripcion.push(nombre);
    this.precio += precio;
  }

  setImagen(imagenStr) {
    this.imagen = imagenStr;
  }
}

module.exports = ComboTemplate;
