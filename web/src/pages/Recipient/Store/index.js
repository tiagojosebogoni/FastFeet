import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import MaskInput from '../../../components/MaskInput';

import HeaderForm from '../../../components/HeaderForm';

import api from '../../../services/api';
import { Container, Content, UnForm } from './styles';

export default function Store({ history }) {
  const formRef = useRef(null);
  const [initialData, setInitialData] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    if (history.location.state) {
      setId(history.location.state.state.id);
      setInitialData(history.location.state.state);

      console.log(history.location.state.state);
    }
  }, []);

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
        zip_code: Yup.string().required('O CEP é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });
      const { name, street, number, city, complement, state, zip_code } = data;
      const nZip = zip_code.replace('-', '');

      try {
        if (id === null || id === 0) {
          await api.post('recipients', {
            name,
            street,
            number,
            city,
            complement,
            state,
            zip_code: nZip
          });
          toast.success('Destinatário editado com sucesso!');
        } else {
          await api.put(`/recipients/${id}`, {
            name,
            street,
            number,
            city,
            complement,
            state,
            zip_code: nZip
          });

          toast.success('Destinatário atualizado com sucesso!');
        }
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
      <Content>
        <HeaderForm
          history={history}
          confirm
          title="Cadastro de destinatário"
        />
        <UnForm
          id="form"
          ref={formRef}
          initialData={initialData}
          onSubmit={handleSubmit}
        >
          <Input
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do destinatário"
          />
          <div>
            <Input
              label="Rua"
              name="street"
              type="text"
              placeholder="Rua do destinatário"
            />
            <Input
              label="Número"
              name="number"
              type="number"
              placeholder="Número da casa"
            />
            <Input label="Complemento" name="complement" type="text" />
          </div>
          <div>
            <Input
              label="Cidade"
              name="city"
              type="text"
              placeholder="Cidade do destinatário"
            />
            <Input
              label="Estado"
              name="state"
              type="text"
              placeholder="Estado do destinatário"
            />
            <MaskInput
              label="CEP"
              name="zip_code"
              mask="99999-999"
              maskPlaceholder={null}
              placeholder="_____-___"
              onKeyPress={e =>
                e.key === 'Enter' ? formRef.current.submitForm() : null
              }
            />
          </div>
        </UnForm>
      </Content>
    </Container>
  );
}
