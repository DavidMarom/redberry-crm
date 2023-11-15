import styled from 'styled-components';

const DARK = '#555555';
const LIGHT = '#ffffff';

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
  
  filter: drop-shadow(0 0 0.75rem #00000010);

`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding-left: 10px;
`;

