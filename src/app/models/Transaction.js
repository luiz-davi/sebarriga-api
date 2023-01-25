const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Transaction extends Model {

  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        type: Sequelize.ENUM(['I', 'O']),
        date: Sequelize.DATE,
        ammount: Sequelize.FLOAT,
        status: Sequelize.ENUM(["pending", "finished", "finished with error"])
      },
      {
        sequelize,
        modelName: 'Transaction',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'acoount' });
  }
}

module.exports = Transaction;
