"use client";
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 15px;
  overflow: hidden;
  background-color: #ffffff;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 160px;
  overflow: hidden;
`;

export const TitleContainer = styled.div`
  width: 100%;
  direction: rtl;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .9rem;
`;

export const TextContainer = styled.div`
  width: 100%;
  direction: rtl;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .6rem;
  height: 31px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  height: 140px;
`;