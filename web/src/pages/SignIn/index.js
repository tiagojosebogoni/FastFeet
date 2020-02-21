import React from 'react';
import logo from '../../assets/logo.png'
import { Form } from '@unform/web'
import Input from '../../components/TInput'
import Button from '../../components/Button'

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" height="40" />

      <Form >
        <Input name="email" type="email" label="SEU E-MAIL"/>
        <Input name="password" type="password" label="SUA SENHA"/>

        <Button type="submit" confirm>Entrar no sistema</Button>
      </Form>
    </>
  );
}
