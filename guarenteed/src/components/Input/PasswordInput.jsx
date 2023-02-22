import React, { useState } from "react";
import styled from "styled-components";
function PasswordInput({ ...rest }) {
  const [view, setview] = useState(false);
  return (
    <Wrapper>
      <SubWrapper>
        <Input type={view ? "text" : "password"} {...rest} />
      </SubWrapper>
      {view ? (
        <i
          onClick={() => setview(false)}
          className="fa-regular fa-eye mt-2"
        ></i>
      ) : (
        <i
          onClick={() => setview(true)}
          className="fa-regular fa-eye-slash mt-2"
        ></i>
      )}
    </Wrapper>
  );
}
const Input = styled.input`
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  outline: none;
  :focus {
    box-shadow: 0 0 7px 0rem rgb(16 66 139 / 29%);
    border-color: rgb(16 66 139 / 29%);
  }
`;
const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 38px;
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s;
  .float-right {
    float: right;
  }
`;
const SubWrapper = styled.div`
  width: 90%;
  float: left;
`;
export default PasswordInput;
