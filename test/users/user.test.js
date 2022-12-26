const request = require('supertest');

const app = require('../../src/app');

describe('Criação de usuários', () => {
  it('Criando um usuário corretamente', () => {
    return request(app)
    .post('/users')
    .send({
      full_name: 'Teste de integração',
      cpf: String(Math.floor(Math.random() * 100000000 + 99999999)),
      rg: String(Math.floor(Math.random() * 1000000 + 999999)),
      email: `${Date.now()}@gmail.com`,
      password: '123456'
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('user');
    });
  });

  it('Criando um usuário com erros de validação no cpf, rg e email', () => {
    return request(app)
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
