import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { Container, Button } from './styles';

export default function DeliveryStatus({ delivery }) {
  let colorLabel = '#C1BC35';
  let text = 'PENDENTE';

  if (delivery.canceled_at !== null) {
    colorLabel = '#DE3B3B';
    text = 'CANCELADA';
  } else if (delivery.end_date !== null) {
    colorLabel = '#2CA42B';
    text = 'ENTREGUE';
  } else if (delivery.start_date !== null) {
    colorLabel = '#4D85EE';
    text = 'RETIRADA';
  }

  return (
    <Container>
      <Button colorLabel={colorLabel}>
        <FaCircle size={10} />
        <span>{text}</span>
      </Button>
    </Container>
  );
}
