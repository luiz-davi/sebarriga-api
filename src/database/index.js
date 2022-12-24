import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import models from './models_list'

class Database {

	constructor(){
		this.init();
	}

	init(){
    // Capturando conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig[process.env.NODE_ENV]);
		// conectando os modelos da aplicação com as tabelas do banco
		models.map(model => model.init(this.connection))
          .map(model => model.associate && model.associate(this.connection.models));
	}

}

export default new Database();
