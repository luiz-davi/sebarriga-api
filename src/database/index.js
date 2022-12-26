const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const models = require('./models_list')

class Database {

	constructor(){
		this.init();
	}

	init(){
    // Capturando conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);
		// conectando os modelos da aplicação com as tabelas do banco
		models.map(model => model.init(this.connection))
          .map(model => model.associate && model.associate(this.connection.models));
	}

}

module.exports =  new Database();
