"use client";
import styled from 'styled-components';

export const Container = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 20px;
  background-color: #ffffff;
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

