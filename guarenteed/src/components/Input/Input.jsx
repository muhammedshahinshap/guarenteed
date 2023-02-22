import React from "react";
import styled from "styled-components";
function Input({ ...rest }) {
  return <InputBox {...rest} />;
}
export default Input;
const InputBox = styled.input`
  margin-top: 10px;
  :focus {
    box-shadow: 0 0 7px 0rem rgb(16 66 139 / 29%);
    border-color: rgb(16 66 139 / 29%);
  }
`;
