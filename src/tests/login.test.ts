import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';

import {
  invalidLoginResponse,
  validLoginResponse,
  validLoginMock,
  findOneMock,
  joiResponseMock,
  noEmailMock,
  noPasswordMock,
  invalidTokenMock,
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /login', () => {
  describe('Verificando o funcionamento do método POST de /login', () => {
    afterEach(sinon.restore);

    it('Verifica se o endpoint retorna um token em caso de sucesso', async () => {
      sinon.stub(User, 'findOne').resolves(findOneMock as User);
      sinon.stub(jwt, 'sign').resolves(validLoginResponse.token);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const response = await chai
        .request(app)
        .post('/login')
        .send(validLoginMock);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(validLoginResponse);
    });

    it('Verifica como o endpoint se comporta sem o campo email', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(noEmailMock);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(joiResponseMock.error);
    });

    it('Verifica como o endpoint se comporta sem o campo password', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(noPasswordMock);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(joiResponseMock.error);
    });

    it('Verifica como o endpoint se comporta com email inválido', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post('/login')
        .send(validLoginMock);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidLoginResponse);
    });

    it('Verifica como o endpoint se comporta com password inválida', async () => {
      sinon.stub(bcrypt, 'compare').resolves(false);

      const response = await chai
        .request(app)
        .post('/login')
        .send(validLoginMock);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidLoginResponse);
    });
  });

  describe('Verificando o funcionamento do método GET de /login/validate', () => {
    it('Verifica o retorno quando o token é passado corretamente', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', validLoginResponse.token);

      expect(response.status).to.equal(200);
      expect(response.body.role).to.deep.equal('admin');
    });
    
    it('Verifica o retorno quando não existe token', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidTokenMock);
    });

    it('Verifica o retorno quando o token é inválido', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '444');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidTokenMock);
    });
  });
});
