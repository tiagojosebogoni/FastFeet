import React, { useState, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import api from '../../../services/api';
import { Container, Content, Table, ButtonAction } from './styles';
import HeaderList from '../../../components/HeaderList';
import DeliveryStatus from '../../../components/DeliveryStatus';
import Action from '../../../components/Action';

export default function List({ history }) {
  const [deliveries, setDeliveries] = useState([]);
  const [actionsVisible, setActionVisible] = useState(false);
  const [actionsClicked, setActionClicked] = useState(0);

  async function loadDelivery() {
    const response = await api.get('deliveries');

    setDeliveries(response.data);
  }

  useEffect(() => {
    loadDelivery();
  }, []);
  function handleNew() {
    history.push('/delivery/store', { state: null });
  }

  function handleEdit(object) {
    history.push(`/delivery/store`, { state: object });
  }

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
                  <ButtonAction
                    onClick={() => {
                      setActionVisible(!actionsVisible);
                      setActionClicked(delivery.id);
                    }}
                  >
                    <MdMoreHoriz size={24} />
                  </ButtonAction>

                  {actionsVisible && actionsClicked === delivery.id && (
                    <Action handleEdit={handleEdit} object={delivery} />
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
