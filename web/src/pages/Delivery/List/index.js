import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import api from '../../../services/api';
import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';
import DeliveryStatus from '../../../components/DeliveryStatus';

export default function List() {
  const [deliveries, setDeliveries] = useState([]);

  async function loadDelivery() {
    const response = await api.get('deliveries');

    setDeliveries(response.data);
  }

  useEffect(() => {
    loadDelivery();
  });
  function handleNew() {}

  return (
    <Container>
      <HeaderList
        title="Gerenciando encomendas"
        search
        onNew={handleNew}
        find={loadDelivery}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.recipients.name}</td>
                <td>{delivery.deliverymans.name}</td>
                <td>{delivery.recipients.city}</td>
                <td>{delivery.recipients.state}</td>
                <td>
                  <DeliveryStatus delivery={delivery} />
                </td>
                <td>
                  <button
                    style={{
                      border: 0,
                      background: '#fff',
                      color: '#c6c6c6'
                    }}
                  >
                    <MdMoreHoriz size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Pagination load={loadPlans} pages={pages} /> */}
      </Content>
    </Container>
  );
}
