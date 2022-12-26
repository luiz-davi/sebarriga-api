import User from "../../models/User";

class StoreService {
  async call(params){
    try {
      const user = await User.create(params);
      return {
        success: true,
        status: 201,
        result: {
          message: "Usuário cadastrado com sucesso",
          user: {
            id: user.id,
            name: user.full_name,
            cpf: user.cpf,
            rg: user.rg,
            email: user.email
          },
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

export default new StoreService();
