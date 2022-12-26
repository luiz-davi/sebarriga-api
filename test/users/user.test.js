const request = require('supertest');
const app = require('../../src/app');

let user = {
  full_name: 'Teste de integração',
  cpf: String(Math.floor(Math.random() * 100000000 + 99999999)),
  rg: String(Math.floor(Math.random() * 1000000 + 999999)),
  email: `${Date.now()}@gmail.com`,
  password: '123456'
}

describe('Criação de usuários', () => {
  it('Criando um usuário corretamente', async () => {
    await request(app)
    .post('/users')
    .send(user)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('user');
      user.id = res.body.user.id;
    });
  });

  it('Criando um usuário com erros de validação no cpf, rg e email', async () => {
    await request(app)
    .post('/users')
    .send({
      full_name: 'Teste de integração',
      cpf: '12345678',
      rg: '123456',
      email: `${Date.now()}gmail.com`,
      password: '12345'
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('cpf');
      expect(res.body.errors).toHaveProperty('rg');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors.cpf).toBe('Deve ter pelo menos 9 caracteres');
      expect(res.body.errors.rg).toBe('Deve ter pelo menos 7 caracteres');
      expect(res.body.errors.email).toBe('Formato de e-mail digitado não é valido');
    });
  });
})

describe('Se autenticar', () => {
  it('Fazer login corretamente', async () => {
    await request(app)
      .post('/users/auth')
      .send({
        email: user.email,
        password: user.password
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.id).toBe(user.id);
        user.token = res.body.token;
      });
  });

  it('Fazer login passando senha incorreta', async () => {
    await request(app)
      .post('/users/auth')
      .send({
        email: user.email,
        password: '125463'
      })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Senha inválida!');
      });
  });
});

describe('Atualizar informações de cadastro', () => {
  it('Atualizar email', async () => {
    await request(app)
      .put('/users')
      .set('Authorization', `bearer ${ user.token }`)
      .send({
        full_name: 'Teste de request',
        old_password: user.password
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.name).toBe('Teste de request');
      });
  });
});
