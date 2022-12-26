import { Router } from 'express';

import UsersController from './app/controllers/UsersController';
import AutenticacaoController from './app/controllers/AutenticacaoController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/users/auth', AutenticacaoController.auth);

routes.use(authMiddleware); // Todas as rotas a baixo dessa rota passarão pela validação do middleware
routes.put('/users', UsersController.update);

export default routes;
