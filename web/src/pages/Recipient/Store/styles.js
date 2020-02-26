import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
`;

export const Line = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 10px;
`;
