import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';

import Input from '../../../components/Input';
import HeaderForm from '../../../components/HeaderForm';
import FileInput from '../../../components/FileInput';

import api from '../../../services/api';
import { Container } from './styles';

export default function Store({ history }) {
  const formRef = useRef(null);

  const [initialData, setInitialData] = useState({});
  const [id, setId] = useState();

  useEffect(() => {
    setInitialData(history.location.state);

    /*
    formRef.current.setFieldValue(
      'avatar',
      'http://localhost:3333/files/48658f59e3772212115aa537f814fc5a.jpg'
    ); */
  }, []);

  async function handleSubmit(e) {
    const { name, email, avatar } = e;

    console.log(JSON.stringify(e));

    /* if (id > 0) {
      await api.put(`deliverymans/${id}`, {
        name,
        email,
        avatar_id
      });
    } else {
      await api.post(`deliverymans`, {
        name,
        email,
        avatar_id
      });
    }
     */

    // history.goBack();
  }

  return (
    <Container>
      <HeaderForm history={history} title="Cadastro de entregadores" />
      <Form
        ref={formRef}
        id="form"
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <FileInput name="avatar" />

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
