const {
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
} = require('../patterns/templateMethod/combosMethod');

const getCombos = (req, res) => {
  try {
    const combos = [
      new ComboFanJunior().crearCombo(),
      new ComboFan().crearCombo(),
      new ComboFanParaDos().crearCombo(),
      new ComboPro().crearCombo(),
      new ComboProParaDos().crearCombo(),
      new CrispetaGrande().crearCombo(),
      new CrispetaMediana().crearCombo(),
      new SandwichJamon().crearCombo(),
      new SandwichQueso().crearCombo(),
      new PerroCaliente().crearCombo(),
      new Gaseosa1280ml().crearCombo(),
      new Gaseosa960ml().crearCombo(),
      new Gaseosa640ml().crearCombo(),
      new AguaPET600ml().crearCombo(),
    ];

    res.status(200).json({ combos });
  } catch (err) {
    console.error('Error al obtener combos:', err);
    res.status(500).json({ error: 'Error al obtener combos' });
  }
};

module.exports = {
  getCombos,
};
