const request = require('supertest');
const app = require('../src/app');
const StoreUserService = require('../src/app/services/users/store');
const AuthService = require('../src/app/services/auth/auth');

let account;
const user = {
  full_name: 'Teste de integração',
  cpf: String(Math.floor(Math.random() * 100000000 + 99999999)),
  rg: String(Math.floor(Math.random() * 1000000 + 999999)),
  email: `${Date.now()}@gmail.com`,
  password: '123456'
}

beforeAll( async () => {
  const result = await StoreUserService.call(user);
  const token = await AuthService.call(user);
  user.id = result.result.user.id
  user.token = token.result.token;
});

describe("Store account.", () => {
  it('Criando uma conta.', async () => {
     await request(app)
      .post('/accounts')
      .set('Authorization', `bearer ${ user.token }`)
      .send({
        name: "Conta teste",
        balance: 10.40
      })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Conta criada com sucesso.');
        expect(res.body).toHaveProperty('account');
        expect(res.body.account.user_id).toBe(user.id);
        account = res.body.account
      });
  });

  it('Criar um conta com o mesmo nome', async () => {
    await request(app)
      .post('/accounts')
      .set('Authorization', `bearer ${ user.token }`)
      .send({
        name: "Conta teste",
        balance: 10.40
      })
      .then(res => {
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Você já possui uma conta com esse nome.');
      });
  })
});

describe("Index account", () => {
  it('Listando contas', async () => {
    await request(app)
      .get('/accounts')
      .set('Authorization', `bearer ${ user.token }`)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Listagem de contas.');
        expect(res.body).toHaveProperty('accounts');
        expect(res.body.accounts.length).toBe(1);
        expect(res.body.accounts[0]).toHaveProperty('name');
        expect(res.body.accounts[0].name).toBe('Conta teste');
      });
  });
});

describe("Show account", () => {
  it('Visualizar conta por id', async () => {
    await request(app)
      .get(`/accounts/${account.id}`)
      .set('Authorization', `bearer ${ user.token }`)
      .then( res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Visualização de conta.');
        expect(res.body).toHaveProperty('account');
        expect(res.body.account.id).toBe(account.id);
        expect(res.body.account.name).toBe(account.name);
      });
  });

  it('Visualizar conta por id que não pertença ao usuário logado', async () => {
    await request(app)
      .get(`/accounts/${account.id + 1000}`)
      .set('Authorization', `bearer ${ user.token }`)
      .then( res => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Conta não encontrada.');
      });
  });
});
