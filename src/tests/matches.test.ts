import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Match';

import { invalidTokenMock, validLoginResponse } from './mocks/login.mock';
import {
  newTeamRequest,
  newTeamMock,
  invalidTeamsMock,
  invalidIdsMock,
  matchesMock,
  updatedMock,
  scoreboardMock,
  inProgressMock,
  finishedGamesMock,
  finishedMock,
} from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /matches', () => {
  describe('Verificando o funcionamento do método POST de /matches', () => {
    afterEach(sinon.restore);

    it('Verifica o retorno quando não existe token', async () => {
      const response = await chai
        .request(app)
        .post('/matches');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidTokenMock);
    });

    it('Verifica o retorno quando o token é inválido', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', '444');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal(invalidTokenMock);
    });

    it('Verifica se é retornado um erro caso os times sejam iguais', async () => {
      sinon.stub(jwt, 'verify').resolves(true);

      const response = await chai
        .request(app)
        .post('/matches')
        .send({ ...newTeamRequest, awayTeam: 1 })
        .set('authorization', validLoginResponse.token);

      expect(response.status).to.equal(422);
      expect(response.body).to.deep.equal(invalidTeamsMock);
    });

    it('Verifica se é retornado um erro caso algum id seja inválido', async () => {
      sinon.stub(jwt, 'verify').resolves(true);
      sinon.stub(Team, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post('/matches')
        .send({ ...newTeamRequest, homeTeam: -1 })
        .set('authorization', validLoginResponse.token);

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal(invalidIdsMock);
    });

    it('Verifica que, em caso de sucesso, o retorno é um novo time', async () => {
      sinon.stub(Match, 'create').resolves(newTeamMock as Match);
      sinon.stub(jwt, 'verify').resolves(true);

      const response = await chai
        .request(app)
        .post('/matches')
        .send(newTeamRequest)
        .set('authorization', validLoginResponse.token);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(newTeamMock);
    });
  });

  describe('Verificando o funcionamento do método GET de /matches', () => {
    beforeEach(() => sinon.stub(Match, 'findAll').resolves(matchesMock as any[]));
    afterEach(sinon.restore);

    it('Verifica se é retornado um array com todos os jogos caso não haja query', async () => {
      const response = await chai
        .request(app)
        .get('/matches');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchesMock);
    });

    it('Verifica se apenas os jogos em progresso são retornados com query "true"', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(inProgressMock);
    });

    it('Verifica se apenas os jogos finalizados são retornados com query "false"', async () => {
      const response = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedGamesMock);
    });
  });

  describe('Verificando o funcionamento do método PATCH de /matches/:id/finish', () => {
    it('Verifica o retorno caso o jogo seja finalizado corretamente', async () => {
      sinon.stub(Match, 'update');

      const response = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedMock);

      sinon.restore();
    });
  });

  describe('Verificando o funcionamento do método PATCH de /matches/:id', () => {
    it('Verifica o retorno caso o jogo seja atualizado corretamente', async () => {
      sinon.stub(Match, 'update');

      const response = await chai
        .request(app)
        .patch('/matches/1')
        .send(scoreboardMock);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedMock);

      sinon.restore();
    });
  });
});