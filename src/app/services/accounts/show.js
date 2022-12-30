const Account = require("../../models/Account");

class ShowService {

  async call(account_id, user_id){

    const account = await Account.findOne({
      where: { id: account_id, user_id }
    });

    if(!account){
      return {
        success: false,
        status: 404,
        error: { message: "Conta não encontrada." }
      };
    }

    return {
      success: true,
      status: 200,
      result: {
        message: "Visualização de conta.",
        account
      }
    };
  }

}

module.exports = new ShowService();
