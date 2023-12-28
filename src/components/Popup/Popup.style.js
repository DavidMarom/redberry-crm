import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  animation: fadein 0.2s;

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;