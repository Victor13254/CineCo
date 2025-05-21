// backend/controllers/comidaController.js

const {Combo1,ComboNachos,AguaCristal,ComboHotDog} = require('../patterns/templateMethod/combosMethod');

const getCombos = (req, res) => {
  try {
    const combos = [
      new Combo1().crearCombo(),
      new ComboNachos().crearCombo(),
      new AguaCristal().crearCombo(),
      new ComboHotDog().crearCombo(),
    ];

    res.status(200).json({ combos });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener combos' });
  }
};

module.exports = {
  getCombos,
};
