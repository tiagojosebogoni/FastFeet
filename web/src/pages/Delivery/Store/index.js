import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import HeaderForm from '../../../components/HeaderForm';

import api from '../../../services/api';
import { Container, Line } from './styles';

export default function Store({ history }) {
  const formRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [deliveryMans, setDeliveryMans] = useState([]);

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
    const response = await api.get('recipients');

    setRecipients(
      response.data.map(recipient => {
        return {
          value: recipient.id,
          label: recipient.name
        };
      })
    );
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  useEffect(() => {
    loadDeliveryMans();
  }, []);

  async function handleSubmit(data) {
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
      <Form ref={formRef} id="form" onSubmit={handleSubmit}>
        <Line>
          <Select
            name="recipient_id"
            label="Destinatários"
            options={recipients}
          />
          <Select
            name="deliveryman_id"
            label="Entregador"
            options={deliveryMans}
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
