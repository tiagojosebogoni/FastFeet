import React from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Header, Title, Component } from './styles';

export default function HeaderList({ title, history }) {
  function goBack() {
    history.goBack();
  }

  return (
    <Header>
      <Title>{title}</Title>
      <Component>
        <Button text="VOLTAR" onClick={goBack}>
          <MdKeyboardArrowLeft size={20} />
        </Button>
        <Button confirm text="SALVAR" type="submit" form="form">
          <MdCheck size={20} />
        </Button>
      </Component>
    </Header>
  );
}

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  onNew: PropTypes.func,
  find: PropTypes.func.isRequired,
  buttonNew: PropTypes.bool,
  search: PropTypes.bool
};

HeaderList.defaultProps = {
  buttonNew: true,
  search: true,
  onNew: null
};
