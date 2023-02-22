import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import styled from "styled-components";
import successImg from "./success.png";
import Button from "../Buttons/Button";
import axios from "axios";
const Emailverify = () => {
  const [valid, setValid] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    verifyEmailUrl();
  }, []);
  const verifyEmailUrl = async () => {
    try {
      const data = await axios.get(`https://guarenteed.tech/users/verify/${id}`);
      data.data === "success" && setValid(true);
    } catch (error) {
      setValid(false);
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {valid ? (
        <Container>
          <img src={successImg} alt="success_img" />
          <h1>Email verified successfully</h1>
          <Link className="mt-2" to="/login">
            <Link to="/">
              <Button>Login</Button>
            </Link>
          </Link>
        </Container>
      ) : (
        <h1 style={{ textAlign: "center", color: "red" }}>
          Something went wrong
        </h1>
      )}
    </React.Fragment>
  );
};

export default Emailverify;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .btn {
    border: none;
    outline: none;
    padding: 12px 0;
    background-color: #3bb19b;
    border-radius: 20px;
    width: 180px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
`;
