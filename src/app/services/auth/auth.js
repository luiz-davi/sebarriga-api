const jwt = require('jsonwebtoken');
const User = require("../../models/User");
const authConfig = require('../../../config/auth');

class AuthService {
  async call(body){
    const { email, password } = body;

    const user = await User.findOne({ where: { email } });

    if(!user){
      return {
        success: false,
        status: 404,
        error: { message: "Usuário não existe!" }
      };
    }

    if(! await user.check_autorization(password)){
      return {
        success: false,
        status: 401,
        error: { message: "Senha inválida!" }
      };
    }

    const { id, name } = user;

    return {
      success: true,
      status: 200,
      result: {
        token: jwt.sign({ id, email }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
        user: {
          id,
          name,
          email
        }
      },
      error: {}
    };
  }
}

module.exports = new AuthService();
