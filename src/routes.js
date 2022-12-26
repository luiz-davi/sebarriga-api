const { Router } = require('express');

const UsersController = require('./app/controllers/UsersController');
const AutenticacaoController = require('./app/controllers/AutenticacaoController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/users/auth', AutenticacaoController.auth);

routes.use(authMiddleware); // Todas as rotas a baixo dessa rota passarão pela validação do middleware
routes.put('/users', UsersController.update);

module.exports = routes;
