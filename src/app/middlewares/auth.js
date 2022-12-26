const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({
      error: {
        message: "Token obrigatório!"
      }
    });
  }

  /**
   * Essa sintax é usada com arrays, a virgula indica o que será ignorado:
   * 1. Se existir um parametro com a vingula atrás, então o valor anterior é ignorado
   * 2. Se a virgula estiver depois do parametro, então o próximo valor será ignorado
   */
  const [, token] = authHeader.split(' ');

  try {

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.user_id = decoded.id;

    return next();


  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Token inválido.'
      }
    });
  }
}
