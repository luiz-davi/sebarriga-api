const { Router } = require('express');

const UsersController = require('./app/controllers/UsersController');
const AutenticacaoController = require('./app/controllers/AutenticacaoController');
const authMiddleware = require('./app/middlewares/auth');
const AccountsController = require('./app/controllers/AccountsController');

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/users/auth', AutenticacaoController.auth);

routes.use(authMiddleware); // Todas as rotas a baixo dessa rota passarão pela validação do middleware
routes.put('/users', UsersController.update);

routes.post('/accounts', AccountsController.validation ,AccountsController.store);
routes.get('/accounts', AccountsController.index);
routes.get('/accounts/:id', AccountsController.show);
routes.put('/accounts/:id', AccountsController.validationUpdate,AccountsController.update);
routes.delete('/accounts/:id', AccountsController.destroy);

module.exports = routes;
