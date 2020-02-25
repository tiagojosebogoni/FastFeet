import React from 'react';

import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';

export default function List() {
  function handleNew() {}
  function loadDeliveryMan() {}

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
            {/* {deliveries.map(delivery => ( */}
            <tr key="delivery.id">
              <td>delivery.deliverymans.photo</td>
              <td>delivery.recipients.name</td>
              <td>delivery.email</td>

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
