import React from "react";
import styled from "styled-components";

function Button({ value, children, ...rest }) {
  return <Wrapper {...rest}>{children}</Wrapper>;
}

export default Button;
const Wrapper = styled.button`
  background-color: #14589d;
  color: #ffffff;
  padding: 10px 25px;
  border-radius: 5px;
  margin-top: 10px;
  border: #14589d;
  :hover {
    background-color: #0a66c2;
  }
`;
