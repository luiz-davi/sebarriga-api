const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Account extends Model {

  static init(sequelize) {
    super.init(
      {
        balance: Sequelize.FLOAT,
      },
      {
        sequelize,
        modelName: 'Account',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Account;
