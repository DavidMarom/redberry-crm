import styled from 'styled-components';

const DARK = '#555555';
const LIGHT = '#dddddd';

export const Container = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 20px;
  background-color: ${({ darkMode }) => (darkMode ? `${DARK}` : `${LIGHT}`)};
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;

`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding-left: 10px;
`;

