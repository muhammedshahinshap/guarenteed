import React from "react";
import styled from "styled-components";

function ButtonDanger({ children, ...rest }) {
  return <Wrapper {...rest}>{children}</Wrapper>;
}

export default ButtonDanger;
const Wrapper = styled.button`
  background-color: #c61414;
  color: #ffffff;
  padding: 5px 25px;
  border-radius: 5px;
  margin-top: 10px;
  border: #14589d;
  :hover {
    background-color: #ad1c1c;
  }
`;
