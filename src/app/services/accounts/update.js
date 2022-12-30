const { Op } = require("sequelize");
const Account = require("../../models/Account");

class UpdateService {

  async call(account_id, params, user_id){

    const account = await Account.findOne({ where: { id: account_id, user_id } });

    if(!account){
      return {
        success: false,
        status: 404,
        error: { message: "Conta não encontrada." }
      };
    }

    const { name } = params;

    if(await Account.findOne({
      where: {
        name,
        user_id,
        id: {
          [Op.not]: [account_id]
         }
      },
    })){
      return {
        success: false,
        status: 400,
        error: { message: "Já existe uma conta com esse nome." }
      };
    }

    await account.update({ name });

    return {
      success: true,
      status: 200,
      result: {
        message: "Conta atualizada comn sucesso.",
        account
      }
    };
  }

}

module.exports = new UpdateService();
