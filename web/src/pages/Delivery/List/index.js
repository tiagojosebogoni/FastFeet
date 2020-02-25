import React from 'react';

import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';

export default function List() {
  function handleNew() {}
  function loadDelivery() {}

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
            {/* {deliveries.map(delivery => ( */}
            <tr key="delivery.id">
              <td>delivery.recipients.name</td>
              <td>delivery.deliverymans.name</td>
              <td>delivery.city</td>
              <td>.state</td>
              <td>delivery.status</td>
              <td>ações</td>
            </tr>
            {/* ))} */}
          </tbody>
        </Table>
        {/* <Pagination load={loadPlans} pages={pages} /> */}
      </Content>
    </Container>
  );
}
