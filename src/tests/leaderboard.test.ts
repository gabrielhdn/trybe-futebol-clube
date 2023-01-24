import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import {app} from '../app';
import sequelize from '../database/models';

import {
  homeLeaderboardMock,
  awayLeadeboardMock,
  leaderboardMock,
} from './mocks/leaderboards.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /leaderboard', () => {
  afterEach(sinon.restore);

  it('Verifica se o método GET de /leaderboard/home tem o retorno esperado', async () => {
    sinon.stub(sequelize, 'query').resolves([homeLeaderboardMock] as any);

    const response = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(homeLeaderboardMock);
  });

  it('Verifica se o método GET de /leaderboard/away tem o retorno esperado', async () => {
    sinon.stub(sequelize, 'query').resolves([awayLeadeboardMock] as any);

    const response = await chai
      .request(app)
      .get('/leaderboard/away');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(awayLeadeboardMock);
  });

  it('Verifica se o método GET de /leaderboard tem o retorno esperado', async () => {
    sinon.stub(sequelize, 'query').resolves([leaderboardMock] as any);

    const response = await chai
      .request(app)
      .get('/leaderboard');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(leaderboardMock);
  });

  it('Verifica se, em caso de erro no banco de dados, é retornado status 500', async () => {
    sinon.stub(sequelize, 'query').resolves(undefined);

    const response = await chai
      .request(app)
      .get('/leaderboard');

    expect(response.status).to.equal(500);
  });
});