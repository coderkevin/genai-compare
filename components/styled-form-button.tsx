"use client";

import styled from "@emotion/styled";

const StyledFormButton = styled.button`
  border-radius: 1rem;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #202020;
  color: #f0f0f0;
  padding: 0.25rem;

  &:hover {
    background-color: #606060;
  }
  &:active {
    background-color: #909090;
  }
  &:disabled {
    color: #606060;
    border-color: #606060;
  }
`;

export default StyledFormButton;
