const ComboTemplate = require('./comboTemplate');

class ComboFanJunior extends ComboTemplate {
  agregarItems() {
    this.agregarItem("1 caja de crispetas de sal (120 g)", 22900);
    this.agregarItem("1 gaseosa pequeña (640 ml)", 10500); // Precio incluido en total
    this.setImagen('/comida/21.jpg');
  }
}

class ComboFan extends ComboTemplate {
  agregarItems() {
    this.agregarItem("1 crispeta pequeña de sal (120 g)", 22900);
    this.agregarItem("1 gaseosa mediana (960 ml)", 13500);
    this.setImagen('/comida/22.jpg'); // Cambia la imagen si tienes otra
  }
}

class ComboFanParaDos extends ComboTemplate {
  agregarItems() {
    this.agregarItem("1 crispeta grande de sal (150 g)", 25900);
    this.agregarItem("2 gaseosas medianas (960 ml)", 13500);
    this.setImagen('/comida/23.jpg'); // Cambia la imagen si tienes otra
  }
}

class ComboPro extends ComboTemplate {
  agregarItems() {
    this.agregarItem("1 crispeta pequeña de sal (120 g)", 22900);
    this.agregarItem("1 gaseosa mediana (960 ml)", 13500);
    this.agregarItem("1 perro caliente o sándwich", 18900);
    this.setImagen('/comida/24.jpg'); // Cambia la imagen si tienes otra
  }
}

class ComboProParaDos extends ComboTemplate {
  agregarItems() {
    this.agregarItem("1 crispeta mediana de sal (120 g)", 22900);
    this.agregarItem("2 gaseosas medianas (960 ml)", 13500*2);
    this.agregarItem("2 perros calientes o sándwiches", 18900*2);
    this.setImagen('/comida/24.jpg'); // Cambia la imagen si tienes otra
  }
}

class CrispetaGrande extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Crispeta de sal 150g (grande)", 25900);
    this.setImagen('/comida/25.jpg');
  }
}

class CrispetaMediana extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Crispeta de sal 120g (mediana)", 22900);
    this.setImagen('/comida/26.jpg'); // Cambia si tienes otra imagen
  }
}

class SandwichJamon extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Sándwich de jamón", 15900);
    this.setImagen('/comida/27.jpg');
  }
}

class SandwichQueso extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Sándwich de queso", 15900);
    this.setImagen('/comida/28.jpg');
  }
}

class PerroCaliente extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Perro caliente", 18900);
    this.setImagen('/comida/29.jpg'); // Cambia si tienes otra imagen
  }
}

class Gaseosa1280ml extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Gaseosa 1280ml", 16900);
    this.setImagen('/comida/30.jpg');
  }
}

class Gaseosa960ml extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Gaseosa 960ml", 13500);
    this.setImagen('/comida/31.jpg'); // Cambia si tienes otra imagen
  }
}

class Gaseosa640ml extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Gaseosa 640ml", 10500);
    this.setImagen('/comida/32.jpg'); // Cambia si tienes otra imagen
  }
}

class AguaPET600ml extends ComboTemplate {
  agregarItems() {
    this.agregarItem("Agua PET 600ml", 6700);
    this.setImagen('/comida/33.jpg'); // Cambia con la imagen correcta si tienes
  }
}

module.exports = {
  ComboFanJunior,
  ComboFan,
  ComboFanParaDos,
  ComboPro,
  ComboProParaDos,
  CrispetaGrande,
  CrispetaMediana,
  SandwichJamon,
  SandwichQueso,
  PerroCaliente,
  Gaseosa1280ml,
  Gaseosa960ml,
  Gaseosa640ml,
  AguaPET600ml,
};
