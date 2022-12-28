 const Account = require("../../models/Account");

class StoreService {

  async call(params, user_id) {
    const accounts = await Account.findAll({
      where: { user_id }
    });

    const { balance } = params;

    if(accounts.length > 0){
      return {
        success: false,
        status: 422,
        result: {
          accounts
        },
        error: { message: 'Usuário já possui uma conta aberta.' }
      };
    }

    try {
      const account = await Account.create({
        user_id,
        balance: balance || 0
      });

      return {
        success: true,
        status: 201,
        result: {
          message: "Conta criada com sucesso.",
          account
        },
        error: {}
      };

    } catch (error) {
      return {
        success: false,
        status: 400,
        result: {},
        error: {message: 'Deu ruim!!'}
      };
    }
  }

}

module.exports = new StoreService();
