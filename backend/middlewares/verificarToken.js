const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'Token no provisto' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verificarToken;
