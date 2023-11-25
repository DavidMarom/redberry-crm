"use client";
import styled from 'styled-components';

export const Container = styled.div`
  width: ${({ width }) => width};
  margin-top: ${({ margintop }) => margintop};
  margin-right: ${({ marginright }) => marginright};
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifycontent }) => justifycontent};
  overflow: hidden;
  `;
