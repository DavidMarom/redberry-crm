"use client";
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #333;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  padding: 23px;
  padding-left:30px;

  color: #aaa;

  @media (max-width: 768px) {
    padding-left: 5px;
    padding-right: 5px;

    p {
      font-size: 11px;
    
    }

  }

`;

export const NavContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  font-size: 12px;
`;