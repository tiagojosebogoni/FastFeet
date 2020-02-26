import React, { useRef } from 'react';
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

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(255, 'Nome pode ter no máximo 255 caracteres')
          .required('Nome é obrigatório'),
        street: Yup.string()
          .max(255, 'Rua pode ter no máximo 255 caracteres')
          .required('Rua é obrigatório'),
        number: Yup.number()
          .integer('obrigatorio')
          .required('Número é obrigatório'),
        complement: Yup.string()
          .max(255, 'Complemento pode ter no máximo 255 caracteres')
          .required('Complemento é obrigatório'),
        city: Yup.string()
          .max(255, 'Cidade pode ter no máximo 255 caracteres')
          .required('Cidade é obrigatório'),
        state: Yup.string()
          .max(255, 'Estado pode ter no máximo 255 caracteres')
          .required('Estado é obrigatório'),
        zip_code: Yup.number()
          .integer()
          .max(8, 'Máximo de 8 dígitos')
          .required('CEP é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });
      const { name, street, number, city, complement, state, zip_code } = data;
      try {
        await api.post('recipients', {
          name,
          street,
          number,
          city,
          complement,
          state,
          zip_code
        });

        toast.success('Registro salvo com sucesso.');
      } catch (e) {
        toast.error(`Não foi possível Salvar o destinatário. ${e}`);
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
      <HeaderForm history={history} title="Cadastro de destinatário" />
      <Form ref={formRef} id="form" onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="NOME"
          placeholder="Ludwig van Beethoven"
        />
        <Line>
          <Input
            name="street"
            type="text"
            label="Rua"
            placeholder="Rua Beethoven"
          />
          <Input
            name="number"
            type="number"
            label="Número"
            placeholder="1729"
          />
          <Input
            name="complement"
            type="text"
            label="Complemento"
            placeholder="Casa, AP"
          />
        </Line>
        <Line>
          <Input name="city" type="text" label="Cidade" placeholder="Diadema" />
          <Input
            name="state"
            type="text"
            label="Estado"
            placeholder="São Paulo"
          />
          <Input
            name="zip_code"
            type="number"
            label="CEP"
            placeholder="09960-580"
          />
        </Line>
      </Form>
    </Container>
  );
}
