import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    const { email, password } = data;

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um email válido.')
          .required('Email é obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo de 6 caracteres')
          .required('Senha é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      dispatch(signInRequest(email, password));
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
    <>
      <img src={logo} alt="FastFeet" height="40" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="************"
        />

        <Button type="submit" confirm>
          Entrar no sistema
        </Button>
      </Form>
    </>
  );
}
