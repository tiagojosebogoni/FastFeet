import React, { useState, useEffect } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import api from '../../../services/api';
import { Container, Content, Table, ButtonAction } from './styles';
import HeaderList from '../../../components/HeaderList';
import Action from '../../../components/Action';

export default function List({ history }) {
  const [recipients, setRecipients] = useState([]);
  const [actionsVisible, setActionVisible] = useState(false);
  const [actionsClicked, setActionClicked] = useState(0);

  async function loadRecipients(name, page) {
    const response = await api.get('/recipients', {
      params: {
        name,
        page
      }
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  function handleEdit(recipient) {
    history.push(`/recipient/store`, { state: recipient });
  }

  function handleNew() {
    history.push({
      pathname: '/recipient/store',
      state: null
    });
  }

  async function handleDelete(id) {
    if (window.confirm(`Confirma a exclusão do entregador?`)) {
      await api.delete(`/recipients/${id}`);

      loadRecipients();
    }
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

                <td>
                  <ButtonAction
                    onClick={() => {
                      setActionVisible(!actionsVisible);
                      setActionClicked(recipient.id);
                    }}
                  >
                    <MdMoreHoriz size={24} />
                  </ButtonAction>

                  {actionsVisible && actionsClicked === recipient.id && (
                    <Action
                      handleDelete={() => handleDelete(recipient.id)}
                      handleEdit={handleEdit}
                      object={recipient}
                    />
                  )}
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
