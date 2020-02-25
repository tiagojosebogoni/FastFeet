import React from 'react';

import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';

export default function List() {
  function handleNew() {}
  function loadRecipients() {}

  return (
    <Container>
      <HeaderList
        title="Gerenciando destinatários"
        search
        onNew={handleNew}
        find={loadRecipients}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* {deliveries.map(delivery => ( */}
            <tr key="delivery.id">
              <td>delivery.name</td>
              <td>delivery.address</td>

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
