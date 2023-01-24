export const newTeamMock = {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: true,
};

export const newTeamRequest = {
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 2,
  awayTeamGoals: 1,
};

export const scoreboardMock = {
  homeTeamGoals: 1,
  awayTeamGoals: 1,
};

export const matchesMock = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Barcelona'
    },
    teamAway: {
      teamName: 'Real Madrid',
    },
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Real Madrid'
    },
    teamAway: {
      teamName: 'Barcelona',
    },
  },
];

export const inProgressMock = [
  { ...matchesMock[0] },
];

export const finishedGamesMock = [
  { ...matchesMock[1] },
];

export const finishedMock = {
  message: 'Finished',
};

export const updatedMock = {
  message: 'Updated',
};

export const invalidTeamsMock = {
  message: 'It is not possible to create a match with two equal teams',
};

export const invalidIdsMock = {
  message: 'There is no team with such id!',
};
