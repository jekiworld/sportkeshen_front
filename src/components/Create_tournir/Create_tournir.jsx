import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Layout } from 'antd';
import TournamentBracket from '../TournamentBracket/TournamentBracket';

const { Title } = Typography;
const { Option } = Select;
const { Content } = Layout;

const Create_tournir = ({ token }) => {
  const [name, setName] = useState('');
  const [teamsCount, setTeamsCount] = useState('');
  const [gameType, setGameType] = useState('');
  const [division, setDivision] = useState('');
  const [gameTime, setGameTime] = useState('');
  const [tournamentCreated, setTournamentCreated] = useState(false);

  const navigate = useNavigate();

  const handleCreateTournament = async () => {
    console.log('Starting to create a tournament with the following details:');
    console.log(`Name: ${name}`);
    console.log(`Teams Count: ${teamsCount}`);
    console.log(`Game Type: ${gameType}`);
    console.log(`Division: ${division}`);
    console.log(`Game Time: ${gameTime}`);
    console.log(`Token: ${token}`);

    if (!token) {
      console.error('Token is not defined');
      return;
    }

    const tournamentData = {
      name,
      teams_count: parseInt(teamsCount),
      game_type: gameType,
      division,
      game_time: gameTime,
    };

    try {
      const response = await fetch('http://localhost:8080/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Tournament created successfully:', data);
        setTournamentCreated(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to create tournament:', response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: "url('./background/background.jpg') no-repeat center center fixed", background: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', padding: '0 50px' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50, borderRadius: 10 }}>
        {!tournamentCreated ? (
          <Form
            layout="vertical"
            style={{ width: '100%', maxWidth: '600px', background: '#fff', padding: '40px', borderRadius: 10, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Title level={2} style={{ textAlign: 'center', color: '#41c958' }}>Создать Турнир</Title>
            <Form.Item label="Название">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Количество Команд">
              <Select value={teamsCount} onChange={(value) => setTeamsCount(value)} placeholder="Выберите количество команд">
                <Option value="2">2</Option>
                <Option value="4">4</Option>
                <Option value="8">8</Option>
                <Option value="16">16</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Тип Игры">
              <Select value={gameType} onChange={(value) => setGameType(value)} placeholder="Выберите тип игры">
                <Option value="5vs5">5 на 5</Option>
                <Option value="6vs6">6 на 6</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Разделение">
              <Input value={division} onChange={(e) => setDivision(e.target.value)} />
            </Form.Item>
            <Form.Item label="Время Игры">
              <Input type="datetime-local" value={gameTime} onChange={(e) => setGameTime(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block onClick={handleCreateTournament} style={{ background: '#41c958', borderColor: '#41c958' }}>
                Создать Турнир
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <TournamentBracket teamsCount={parseInt(teamsCount)} />
        )}
      </Content>
    </Layout>
  );
};

export default Create_tournir;
