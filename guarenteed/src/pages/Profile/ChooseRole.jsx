import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function ChooseRole() {
  const navigate = useNavigate();
  return (
    <Wrapper className="container-fluid">
      <SubWrapper
        onClick={() => navigate("/user-profile")}
        className="card adj-user-card"
      >
        <b>User</b>
      </SubWrapper>
      <SubWrapper
        onClick={() => navigate("/company-profile")}
        className="card "
      >
        <b>Company</b>
      </SubWrapper>
    </Wrapper>
  );
}

export default ChooseRole;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  justify-content: space-around;
  display: flex;
  align-items: center;
  height: 100vh;
  .adj-user-card {
    padding: 50px 65px;
  }
`;
const SubWrapper = styled.div`
  padding: 50px;
  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 17px 3px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 24%);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-color: #ffffff;
  }
`;
