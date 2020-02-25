import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import { Title } from '../../../components/HeaderList/styles';
import { Container, Content, Table } from './styles';

export default function List() {
  const [problems, setProblems] = useState([]);

  async function loadProblems() {
    const response = await api.get('deliveryProblems');

    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems();
  });

  return (
    <Container>
      <Title>Problemas na entrega</Title>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>#{problem.delivery_id}</td>
                <td>{problem.description}</td>

                <td>ações</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Pagination load={loadPlans} pages={pages} /> */}
      </Content>
    </Container>
  );
}
