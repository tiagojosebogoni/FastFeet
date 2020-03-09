import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
`;

export const Content = styled.div`
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 900px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  thead th {
    color: #444;
    font-size: 16px;
    text-align: center;
    :nth-child(1) {
      text-align: left;
    }
  }
  tbody {
    td {
      font-size: 16px;
      color: #666;
      text-align: center;
      padding: 12px 0;
      :nth-child(1) {
        text-align: left;
      }
      .edit {
        border: 0;
        font-size: 15px;
        color: #4d85ee;
        background: #fff;
        margin: 0 30px 0 10px;
      }
      .remove {
        border: 0;
        font-size: 15px;
        color: #de3b3b;
        background: #fff;
        margin: 0 30px 0 10px;
      }
    }
  }
`;

export const ButtonAction = styled.div`
  border: 0;
  background: none;
`;
