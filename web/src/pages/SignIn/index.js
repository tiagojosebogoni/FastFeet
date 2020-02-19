import React from 'react';
import logo from '../../assets/logo.png'
import { Form } from '@unform/web'
import Input from '../../conponents/TInput'
import Button from '../../conponents/Button'


import { Container } from './styles';

export default function SignIn() {
  return (
    <Container>
        <img src={logo} />

        <Form >
            <Input name="email" type="email" label="SEU E-MAIL"/>
            <Input name="password" type="password" label="SUA SENHA"/>

            <Button type="submit" confirm>Entrar no sistema</Button>
        </Form>


    </Container>
  );
}
