import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcryptjs';

class User extends Model {

  static init(sequelize){
    super.init(
      {
        full_name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  check_autorization(password){
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
