module.exports = {
  development: {
    dialect: process.env.DIALECT_SEQUELIZE,
    username: process.env.USERNAME_SEQUELIZE,
    password: process.env.PASSWORD_SEQUELIZE,
    database: process.env.DATABASE_NAME_SEQUELIZE,
    host: process.env.HOST_SEQUELIZE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
};
