"use client";
import styled from "styled-components";
8;

export const Container = styled.div`
  min-width: 10vw;
  max-width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;

  & > * {
    margin: 5px;
  }

  & p {
  }

  & img {
    border-radius: 50%;
  }

  & button {
  }
`;
export const LogoName = styled.p`
  color: var(--red02);
  font-size: 24px;
`;
