import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div``;

export const Button = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 5px 10px;
  background: ${props => props.colorLabel && lighten(0.2, props.colorLabel)};

  svg {
    margin-right: 5px;
    color: ${props => props.colorLabel};
  }

  span {
    color: ${props => props.colorLabel};
  }
`;
