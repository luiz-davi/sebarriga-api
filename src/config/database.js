module.exports = {
  development: {
    dialect: 'postgres',
    username: 'postgres',
    password: '',
    database: 'seubarriga_api',
    host: 'localhost',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
};
