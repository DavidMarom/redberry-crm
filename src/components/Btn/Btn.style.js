"use client";
import styled from 'styled-components';

export const Container = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin-top: ${({ margintop }) => margintop};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ background }) => background};
  border-radius: 50px;
  padding: 0 20px;
`;

