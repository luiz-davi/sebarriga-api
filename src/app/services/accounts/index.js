const Account = require("../../models/Account");

class IndexService {

  async call(user_id){

    const accounts = await Account.findAll({
      where: { user_id }
    });

    return {
      success: true,
      status: 200,
      result: {
        message: "Listagem de contas.",
        accounts
      }
    };
  }

}

module.exports = new IndexService();
