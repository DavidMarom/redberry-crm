"use client";
import styled from 'styled-components';

export const Container = styled.div`
  min-height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin-top: ${({ margintop }) => margintop};
  margin-right: ${({ marginright }) => marginright};
  border-radius: 20px;
  padding: 20px;
  padding-right: ${({ paddingright }) => paddingright};
  padding-left: ${({ paddingleft }) => paddingleft};
  background-color: ${({ backgroundcolor }) => backgroundcolor};

  display: flex;
  flex-direction: column;
  justify-content: ${({ justifycontent }) => justifycontent};
  overflow: hidden;
  
  filter: drop-shadow(0 0 0.75rem #00000010);
`;

