import React, { useState, useEffect } from 'react';

import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';
import api from '../../../services/api';

export default function List({ history }) {
  const [deliveryMans, setDeliveryMans] = useState([]);

  async function loadDeliveryMan() {
    const response = await api.get('deliverymans');

    setDeliveryMans(response.data);
  }

  useEffect(() => {
    loadDeliveryMan();
  });

  function handleNew() {
    history.push({
      pathname: '/deliveryman/store',
      state: null
    });
  }

  return (
    <Container>
      <HeaderList
        title="Gerenciando entregadores"
        search
        onNew={handleNew}
        find={loadDeliveryMan}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMans.map(deliveryMan => (
              <tr key={deliveryMan.id}>
                <td>#{deliveryMan.id}</td>
                <td />
                <td>{deliveryMan.name}</td>
                <td>{deliveryMan.email}</td>

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
