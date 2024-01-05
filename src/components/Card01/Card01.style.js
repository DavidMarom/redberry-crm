"use client";
import styled from 'styled-components';

export const Container = styled.div`
  min-height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin-top: ${({ margintop }) => margintop};
  margin-right: ${({ marginright }) => marginright};
  border-radius: 20px;
  padding: 20px;
  padding-right: 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};

  display: flex;
  flex-direction: column;
  justify-content: ${({ justifycontent }) => justifycontent};
  overflow: hidden;
  
  filter: drop-shadow(0 0 0.75rem #00000010);
`;

// export const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   width: 100%;
//   padding-left: 10px;
// `;

