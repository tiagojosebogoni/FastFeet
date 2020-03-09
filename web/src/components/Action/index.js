import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Edit, Delete } from './styles';

export default function Action({ object, handleEdit, handleDelete }) {
  return (
    <Container>
      <Edit onClick={() => handleEdit(object)}>
        <MdEdit size={10} />
        <span>Editar</span>
      </Edit>
      <Delete onClick={handleDelete}>
        <MdDeleteForever size={10} />
        <span>Excluir</span>
      </Delete>
    </Container>
  );
}
