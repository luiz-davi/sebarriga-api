import User from "../../models/User";

class StoreService {
  async call(req){
    const { name, email, password } = req.body;

    try {
      const user = await User.create({
        name,
        email,
        password
      });

      return {
        success: true,
        result: {
          message: "Usuário cadastrado com sucesso",
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
        },
        error: {}
      };

    } catch (error) {
      return {
        success: false,
        result: {},
        error: error.errors
      };
    }
  }
}

export default new StoreService();
