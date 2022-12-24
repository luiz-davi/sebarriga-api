import express from 'express';
import cors from 'cors';
import routes from './routes';
// fazendo projeto enxegar as variáveis de ambiente no .env
import 'dotenv/config';
// Inicializando conexão com banco e os modelos
import './database';
import './config/translationsYup';

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

export default new App().server;
