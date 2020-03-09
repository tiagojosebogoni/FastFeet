import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import AsyncSelect from '../../../components/AsyncSelect';
import HeaderForm from '../../../components/HeaderForm';

import api from '../../../services/api';
import { Container, Line } from './styles';

export default function Store({ history }) {
  const formRef = useRef(null);
  const [initialData, setInitialData] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(0);

  const [deliveryMans, setDeliveryMans] = useState([]);

  useEffect(() => {
    console.log(recipients);
  }, [recipients]);

  async function loadDeliveryMans() {
    const response = await api.get('deliverymans');

    setDeliveryMans(
      response.data.map(deliveryMan => {
        return {
          value: deliveryMan.id,
          label: deliveryMan.name
        };
      })
    );
  }

  async function loadRecipients() {
    const response = await api.get('/recipients');

    setRecipients(
      response.data.map(recipient => {
        return {
          value: recipient.id,
          label: recipient.name
        };
      })
    );
  }

  async function loadDelivery() {
    /* console.log(`+++++${JSON.stringify(history.location.state.state)}`);
    setInitialData(history.location.state.state); */
    // setInitialData({ product: 'productt', recipients_id: 1 });
  }

  useEffect(() => {
    loadDelivery();
  }, []);

  async function handleSubmit(data) {
    console.log(`DATA:${JSON.stringify(data)}`);
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.number().required('Destinatário é obrigatório'),
        deliveryman_id: Yup.number().required('Entregador é obrigatório'),
        product: Yup.string()
          .max(255, 'Produto pode ter no máximo 255 caracteres')
          .required('Produto é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      // eslint-disable-next-line camelcase
      const { recipient_id, deliveryman_id, product } = data;

      try {
        await api.post('deliveries', {
          recipient_id,
          deliveryman_id,
          product
        });

        toast.success('Registro salvo com sucesso.');
        history.goBack();
      } catch (e) {
        toast.error(`Não foi possível Salvar a encomenda. ${e}`);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <HeaderForm history={history} title="Cadastro de encomendas" />
      <Form id="form" ref={formRef} onSubmit={handleSubmit}>
        <Line>
          <AsyncSelect
            noOptionsMessage={() => 'Não há Destinatários'}
            label="Destinatário"
            name="recipient_id"
            loadOptions={loadRecipients}
            value={recipients}
            onChange={setSelectedRecipient}
          />
          <AsyncSelect
            noOptionsMessage={() => 'Não há Entregador'}
            label="Entregador"
            name="deliveryMan_id"
            loadOptions={loadDeliveryMans}
            value={deliveryMans}
            onChange={setDeliveryMans}
          />
          <Input
            name="product"
            type="text"
            label="Nome do produto"
            placeholder="Yamaha SX7"
          />
        </Line>
      </Form>
    </Container>
  );
}
