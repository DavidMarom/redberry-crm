"use client";
import styled from 'styled-components';

export const Strip01 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5rem;
  padding-bottom: 17rem;
  background-color:#F5E3F532;

  h1 {
    font-size: 3.7rem;
    color: #484E4C;
    font-weight: 100
  }

  h2 {
    font-size: 3.7rem;
    color: #484E4C;
    font-weight: 900;
  }
  
  p {
    font-size: .9rem;
    color: #7d7d7d;
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    padding-top: .1rem;
    padding-left: 1.5rem;
  }

  @media (max-width: 768px) {
    padding-top: 2rem;

    h1,h2 {
      font-size: 2.5rem;
    }
  }
`;

export const BulletRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: .7rem;
`;

export const Hero = styled.div`

  padding-top: 2.5rem;
  position: relative;
  right: 6rem;

@media (max-width: 960px) {
  display: none
}
`;

export const HeroText = styled.div`
font-family: 'Inter', sans-serif;
font-weight: 100;
font-size: 1rem;
color: #484E4C;
margin-top: 1rem;
max-width: 24rem;
`;

