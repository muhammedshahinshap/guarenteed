import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Buttons/Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="sub-wrapper">
        <div className="row">
          <h1>Page Not Found</h1>
        </div>
        <div className="row">
          <div className="center-btn">
            <Button
              onClick={() => {
                navigate(-1);
              }}
              className="cust-btn"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PageNotFound;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  .cust-btn {
    width: 20%;
    padding: 5px 5px;
  }
  .center-btn {
    justify-content: center;
    display: flex;
  }
  .sub-wrapper h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: type 0.5s alternate infinite;
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
`;
