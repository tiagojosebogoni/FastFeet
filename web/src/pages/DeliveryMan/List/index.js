import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import HeaderList from '../../../components/HeaderList';
import Action from '../../../components/Action';
import api from '../../../services/api';

import { Container, Content, Table, ButtonAction } from './styles';

export default function List({ history }) {
  const [deliveryMans, setDeliveryMans] = useState([]);
  const [actionsVisible, setActionVisible] = useState(false);
  const [actionsClicked, setActionClicked] = useState(0);

  async function loadDeliveryMan() {
    const response = await api.get('deliverymans');

    setDeliveryMans(response.data);
  }

  function handleEdit({ id, name, email, avatar }) {
    history.push({
      pathname: '/deliveryman/store',
      state: { id, name, email, avatar }
    });
  }
  async function handleDelete(id) {
    if (window.confirm(`Confirma a exclusão do entregador?${id}`)) {
      await api.delete(`deliverymans/${id}`);
      loadDeliveryMan();
    }
  }

  useEffect(() => {
    loadDeliveryMan();
  }, []);

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

                <td>
                  <ButtonAction
                    onClick={() => {
                      setActionVisible(!actionsVisible);
                      setActionClicked(deliveryMan.id);
                    }}
                  >
                    <MdMoreHoriz size={24} />
                  </ButtonAction>

                  {actionsVisible && actionsClicked === deliveryMan.id && (
                    <Action
                      handleEdit={() => handleEdit(deliveryMan)}
                      handleDelete={() => handleDelete(deliveryMan.id)}
                      id={deliveryMan.id}
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
