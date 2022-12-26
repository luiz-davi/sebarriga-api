// Inicializando conexão com banco e os modelos
require('./database');
// fazendo projeto enxegar as variáveis de ambiente no .env
require('dotenv/config');
// Traduzindo mensagens de erro do yup
require('./config/translationsYup');

const cors = require('cors');

const express = require('express');
const routes = require('./routes');

class App {

  constructor(){
    this.server = express();

    this.middlewares();
    this.routes();
  }

  routes(){
    this.server.use(routes);
  }

  middlewares(){
    this.server.use(cors());
    this.server.use(express.json());
  }

}

module.exports =  new App().server;
