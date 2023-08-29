"use client";

import styled from "@emotion/styled";

const StyledRoundButton = styled.button`
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #202020;
  color: #f0f0f0;
  padding: 0.25rem;
  font-size: 2rem;

  &:hover {
    background-color: #606060;
  }
  &:active {
    background-color: #909090;
  }
`;

export default StyledRoundButton;
