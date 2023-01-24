const htLeaderboards = `
  SELECT t.team_name AS name,
  ((SUM(m.home_team_goals > m.away_team_goals) * 3)
  + SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
  COUNT(m.home_team) AS totalGames,
  SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
  SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
  SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  (SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS goalsBalance,
  FORMAT((((SUM(m.home_team_goals > m.away_team_goals) * 3)
  + SUM(m.home_team_goals = m.away_team_goals))
  / (COUNT(m.home_team) * 3) * 100), 2) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams AS t
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
  ON t.id = m.home_team
  WHERE m.in_progress = 0
  GROUP BY name
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

const atLeaderboards = `
  SELECT t.team_name AS name,
  ((SUM(m.away_team_goals > m.home_team_goals) * 3)
  + SUM(m.away_team_goals = m.home_team_goals)) AS totalPoints,
  COUNT(m.away_team) AS totalGames,
  SUM(m.away_team_goals > m.home_team_goals) AS totalVictories,
  SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
  SUM(m.away_team_goals < m.home_team_goals) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  (SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS goalsBalance,
  FORMAT((((SUM(m.away_team_goals > m.home_team_goals) * 3)
  + SUM(m.away_team_goals = m.home_team_goals))
  / (COUNT(m.away_team) * 3) * 100), 2) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams AS t
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
  ON t.id = m.away_team
  WHERE m.in_progress = 0
  GROUP BY name
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

const leaderboards = `
  SELECT name,
  SUM(l.totalPoints) AS totalPoints,
  SUM(totalGames) AS totalGames,
  SUM(totalVictories) AS totalVictories,
  SUM(totalDraws) AS totalDraws,
  SUM(totalLosses) AS totalLosses,
  SUM(goalsFavor) AS goalsFavor,
  SUM(goalsOwn) AS goalsOwn,
  SUM(goalsBalance) AS goalsBalance,
  FORMAT((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100, 2) AS efficiency
  FROM (
    SELECT t.team_name AS name,
    ((SUM(m.home_team_goals > m.away_team_goals) * 3)
    + SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
    COUNT(m.home_team) AS totalGames,
    SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
    SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
    SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    (SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS t
    INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
    ON t.id = m.home_team
    WHERE m.in_progress = 0
    GROUP BY name
  UNION ALL
    SELECT t.team_name AS name,
    ((SUM(m.away_team_goals > m.home_team_goals) * 3)
    + SUM(m.away_team_goals = m.home_team_goals)) AS totalPoints,
    COUNT(m.away_team) AS totalGames,
    SUM(m.away_team_goals > m.home_team_goals) AS totalVictories,
    SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
    SUM(m.away_team_goals < m.home_team_goals) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    (SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.teams AS t
    INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
    ON t.id = m.away_team
    WHERE m.in_progress = 0
    GROUP BY name
  ) AS l
  GROUP BY name
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export default {
  htLeaderboards,
  atLeaderboards,
  leaderboards,
};
