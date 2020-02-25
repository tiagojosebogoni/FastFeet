import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logoSmall from '../../assets/logo.png';

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
        <img src={logoSmall} alt="FastFeet " height={30} />
        <Menu>
          <Link to="/delivery/list">ENCOMENDAS</Link>
          <Link to="/deliveryman/list">ENTREGADORES</Link>
          <Link to="/recipient/list">DESTINATÁRIOS</Link>
          <Link to="/helpOrder/list ">PROBLEMAS</Link>
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
