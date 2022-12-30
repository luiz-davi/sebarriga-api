const Account = require('../../models/Account');

class DestroyService {

  async call(account_id, user_id){
    const account = await Account.findOne({
      where: { id: account_id, user_id}
    });

    if(!account){
      return {
        success: false,
        status: 404,
        error: { error: { message: 'Conta não encontrada.'} }
      };
    }

    if(account.balance > 0){
      return {
        success: false,
        status: 422,
        error: { error: { message: 'Sua conta ainda possui saldo.'} }
      };
    }

    await account.destroy();

    return {
      success: true,
      status: 200,
      result: {
        message: 'Conta excluída com sucesso.',
        destroy: true
      }
    };
  }

}

module.exports = new DestroyService();
