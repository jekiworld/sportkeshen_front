import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, Select, Typography, Layout } from 'antd';

const { Title } = Typography;
const { Option } = Select;
const { Content } = Layout;

const FindTournaments = ({ token }) => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:8080/rooms', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, [token]);

  const handleJoinTournament = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/join-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...values, roomId: selectedTournament.id })
      });

      if (response.ok) {
        console.log('Joined tournament successfully');
        setModalVisible(false);
      } else {
        console.error('Failed to join tournament');
      }
    } catch (error) {
      console.error('Error joining tournament:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: "url('./background/background.jpg') no-repeat center center fixed", backgroundSize: 'cover', padding: '0 50px' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Title level={2} style={{ color: '#41c958' }}>Доступные Турниры</Title>
        {tournaments.map(tournament => (
          <Card
            key={tournament.id}
            style={{ width: 300, marginBottom: 20 }}
            actions={[
              <Button type="primary" onClick={() => { setSelectedTournament(tournament); setModalVisible(true); }}>Присоединиться</Button>
            ]}
          >
            <Card.Meta title={tournament.name} description={`Команды: ${tournament.teams_count}, Тип игры: ${tournament.game_type}`} />
          </Card>
        ))}
        <Modal
          title="Присоединиться к турниру"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleJoinTournament}>
            <Form.Item label="Позиция" name="position" rules={[{ required: true, message: 'Пожалуйста, выберите позицию' }]}>
              <Select placeholder="Выберите позицию">
                <Option value="defender">Защита</Option>
                <Option value="midfielder">Полузащита</Option>
                <Option value="forward">Нападение</Option>
                <Option value="goalkeeper">Вратарь</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Нога" name="foot" rules={[{ required: true, message: 'Пожалуйста, выберите ногу' }]}>
              <Select placeholder="Выберите ногу">
                <Option value="left">Левая</Option>
                <Option value="right">Правая</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Что получается лучше всего" name="bestSkill" rules={[{ required: true, message: 'Пожалуйста, введите навык' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Рост и вес" name="heightWeight" rules={[{ required: true, message: 'Пожалуйста, введите рост и вес' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: '#41c958', borderColor: '#41c958' }}>
                Присоединиться
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default FindTournaments;
