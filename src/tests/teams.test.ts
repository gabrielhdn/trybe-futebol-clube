import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';

import {
  oneTeamMock,
  teamsMock,
} from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /teams', () => {
  describe('Verificando o funcionamento do método GET de /teams', () => {
    afterEach(sinon.restore);

    it('Verifica se o retorno é um array de times', async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);

      const response = await chai
        .request(app)
        .get('/teams');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teamsMock);
    });
  });

  describe('Verifica o funcionamento do método GET de /teams/:id', () => {
    afterEach(sinon.restore);

    it('Verifica se o retorno é um objeto de time', async () => {
      sinon.stub(Team, 'findOne').resolves(oneTeamMock as Team);

      const response = await chai
        .request(app)
        .get('/teams/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(oneTeamMock);
    });
  });
});