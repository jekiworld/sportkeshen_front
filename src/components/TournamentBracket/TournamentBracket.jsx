import React, { useState } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import './TournamentBracket.css';

const { Title, Text } = Typography;

const generateInitialBracket = (teamsCount) => {
  const rounds = Math.ceil(Math.log2(teamsCount));
  const bracket = [];

  for (let i = 0; i < rounds; i++) {
    const matches = 2 ** (rounds - i - 1);
    const round = [];

    for (let j = 0; j < matches; j++) {
      round.push({
        id: `${i}-${j}`,
        home: i === 0 ? `Team ${2 * j + 1}` : null,
        visitor: i === 0 ? `Team ${2 * j + 2}` : null,
        winner: null,
      });
    }

    bracket.push(round);
  }

  return bracket;
};

const TournamentBracket = ({ teamsCount }) => {
  const initialBracket = generateInitialBracket(teamsCount);
  const [bracket, setBracket] = useState(initialBracket);

  const handleWinner = (roundIndex, matchIndex, winner) => {
    const newBracket = [...bracket];
    newBracket[roundIndex][matchIndex].winner = winner;

    if (roundIndex < newBracket.length - 1) {
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextMatchSide = matchIndex % 2 === 0 ? 'home' : 'visitor';
      newBracket[roundIndex + 1][nextMatchIndex][nextMatchSide] = winner;
    }

    setBracket(newBracket);
  };

  return (
    <div className="bracket">
      {bracket.map((round, roundIndex) => (
        <div className="round" key={roundIndex}>
          <Title level={4}>Round {roundIndex + 1}</Title>
          {round.map((match, matchIndex) => (
            <Card
              key={match.id}
              className="match"
              style={{ marginBottom: '20px', textAlign: 'center' }}
              onClick={() => handleWinner(roundIndex, matchIndex, match.home)}
            >
              <Row>
                <Col span={24} className={`team ${match.winner === match.home ? 'winner' : ''}`}>
                  <Text>{match.home || 'TBD'}</Text>
                </Col>
                <Col span={24} className={`team ${match.winner === match.visitor ? 'winner' : ''}`}>
                  <Text>{match.visitor || 'TBD'}</Text>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;
