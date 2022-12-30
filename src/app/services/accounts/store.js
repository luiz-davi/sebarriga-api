 const Account = require("../../models/Account");

class StoreService {

  async call(params, user_id) {
    const { name, balance } = params;
    const accounts = await Account.findAll({
      where: { user_id, name }
    });


    if(accounts.length > 0){
      return {
        success: false,
        status: 422,
        result: {
          accounts
        },
        error: { message: 'Você já possui uma conta com esse nome.' }
      };
    }

    try {
      const account = await Account.create({
        name,
        balance: balance || 0,
        user_id,
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
        error: error.errors
      };
    }
  }

}

module.exports = new StoreService();
