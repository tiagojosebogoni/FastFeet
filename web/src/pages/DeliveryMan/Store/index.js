import React from 'react';
import { Form } from '@unform/web';

import Input from '../../../components/Input';
import HeaderForm from '../../../components/HeaderForm';
import FileInput from '../../../components/FileInput';

import api from '../../../services/api';
import { Container } from './styles';

export default function Store({ history }) {
  async function handleSubmit(e) {
    const { name, email, avatar_id } = e;

    const response = await api.post('deliverymans', { name, email, avatar_id });

    history.goBack();
  }

  return (
    <Container>
      <HeaderForm history={history} title="Cadastro de entregadores" />
      <Form id="form" onSubmit={handleSubmit}>
        <FileInput name="avatar_id" />
        <Input
          name="name"
          type="text"
          label="NOME"
          placeholder="Nome completo"
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="exemplo@email.com"
        />
      </Form>
    </Container>
  );
}
