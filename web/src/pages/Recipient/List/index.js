import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import { Container, Content, Table } from './styles';
import HeaderList from '../../../components/HeaderList';

export default function List({ history }) {
  const [recipients, setRecipients] = useState([]);

  async function loadRecipients() {
    const response = await api.get('recipients');

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  function handleNew() {
    history.push({
      pathname: '/recipient/store',
      state: null
    });
  }

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
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street.trim()}, {recipient.number},{' '}
                  {recipient.city} - {recipient.state}
                </td>

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
