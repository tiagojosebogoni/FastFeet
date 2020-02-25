import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import logo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  function hangleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="FastFeet" height="40" />

      <Form onSubmit={hangleSubmit}>
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
