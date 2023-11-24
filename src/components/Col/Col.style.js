"use client";
import styled from 'styled-components';

export const Container = styled.div`
  min-height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin-top: ${({ margintop }) => margintop};
  margin-right: ${({ marginright }) => marginright};
  border-radius: 20px;
  background-color: #ffffff;
  padding: 20px;
  padding-right: 40px;

  display: flex;
  flex-direction: column;
  justify-content: ${({ justifycontent }) => justifycontent};
  overflow: hidden;
  
  filter: drop-shadow(0 0 0.75rem #00000010);
`;
