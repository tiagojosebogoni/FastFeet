import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logoSmall from '../../assets/logo.svg';

import { signOut } from '../../store/modules/auth/actions';
import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logoSmall} alt="FastFeet " />
        <Menu>
          <NavLink to="/delivery/list">ENCOMENDAS</NavLink>
          <NavLink to="/deliveryman/list">ENTREGADORES</NavLink>
          <NavLink to="/recipient/list">DESTINATÁRIOS</NavLink>
          <NavLink to="/problem/list ">PROBLEMAS</NavLink>
        </Menu>
      </Content>
      <Profile>
        <div>
          <strong>{user.name}</strong>
          <button onClick={handleSignOut} type="button">
            Sair do sistema
          </button>
        </div>
      </Profile>
    </Container>
  );
}
