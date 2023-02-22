import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Input/Buttons/Button";
import Input from "../../components/Input/Input";
import axiosConfig from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { auth } from "../ReduxToolkit/Auth";
import PasswordInput from "../../components/Input/PasswordInput";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useToast } from "@chakra-ui/react";
import { googleAPI } from "../../config/Const";
function Login() {
  const toast = useToast();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ErrOccured = () => {
    toast({
      title: "Something went wrong.",
      description: "Issue occured",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      if (username && password) {
        const formData = {
          username,
          password,
        };
        const res = await axiosConfig.post("users/login", formData);
        if (!res.data.error) {
          const token = {
            token: res.data.data?.[0]?.token,
            role: res.data.data?.[0]?.data?.role,
            id: res.data.data?.[0]?.data?._id,
          };
          dispatch(auth({ type: "SET_TOKEN", details: token }));
        } else {
          toast({
            title: "Try again.",
            description: `${res.data.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });

          clearAll();
        }
      } else {
        toast({
          title: "Try again.",
          description: "Please Fill All Fields",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      ErrOccured();
    }
  };
  const clearAll = () => {
    setusername("");
    setpassword("");
    document.getElementById("username").focus();
  };
  const gLogin = async (username) => {
    try {
      const formData = {
        username,
      };
      let data = await axiosConfig.post("/users/google-login", formData);
      if (!data.data.error) {
        const token = {
          token: data.data.data[0].token,
        };
        dispatch(auth({ type: "SET_TOKEN", details: token }));
      } else {
        toast({
          title: "Try again.",
          description: `${data.data.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async (email) => {
    const formData = {
      username: email,
      password: email,
      valid: true,
    };
    try {
      let data = await axiosConfig.post("/users/register", formData);
      if (
        data.data.message === "User Already Exist" ||
        data.data.message === "Successfully Completed"
      ) {
        gLogin(email);
      } else {
        toast({
          title: "Try again.",
          description: `${data.data.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      ErrOccured();
      console.log(error);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await axios.get(googleAPI, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        if (data) getData(data.data.email);
        else {
          toast({
            title: "Try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        ErrOccured();
        console.log(error);
      }
    },
  });

  return (
    <Wrapper className="container-fluid">
      <LoginWrapper>
        <Card>
          <H1>Welcome to Guaranteed</H1>
          <H2>Login</H2>
          <form onSubmit={userLogin}>
            <label>Username : (E-mail)</label>
            <Input
              type="email"
              onChange={(e) => setusername(e.target.value)}
              value={username}
              placeholder="Username"
              className="form-control mt-0"
              id="username"
            />
            <label>Password :</label>
            <PasswordInput
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="form-control mt-0"
            />

            <Link to="/forget-password">
              <b>Forget Password</b>
            </Link>
            <Button style={{ width: "100%" }} type="submit">
              Login
            </Button>
          </form>
          <LoginWithGoogle onClick={googleLogin}>
            Sign in with Google
          </LoginWithGoogle>
          <Button className="create-btn" onClick={() => navigate("/signup")}>
            Create Account
          </Button>
        </Card>
      </LoginWrapper>
      <GreyDiv>
        <h2>Make you connection</h2>
      </GreyDiv>
      <WhiteDiv>
        <h2>Find the right job or internship for you</h2>
      </WhiteDiv>
      <RedDiv>
        <h2>Post your job for millions of people to see</h2>
      </RedDiv>
    </Wrapper>
  );
}

export default Login;
const LoginWrapper = styled.div`
  .create-btn {
    background: #000;
    width: 100%;
    :hover {
      background: #303030;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  .adj-left {
    margin-left: 10px;
  }
  background-color: #f8f4ec;
`;
const Card = styled.div`
  label {
    margin-top: 10px;
  }
  border: 1px solid #eeeeee;
  padding: 30px 50px 50px 50px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 4px 0rem rgb(16 66 139 / 29%);
  @media (max-width: 450px) {
    padding: 35px;
  }
`;
const LoginWithGoogle = styled.button`
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: #ededed;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;
const H2 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
`;
const H1 = styled.h2`
  text-align: center;
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  color: #6b6b6b;
`;
const Wrapper = styled.div`
  overflow: hidden;
  padding: 0px !important;
  form {
    margin-top: 30px;
  }
`;
const WhiteDiv = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 400;
  color: #b24020;
  font-family: Arial, Helvetica, sans-serif;
  padding: 75px;
`;
const RedDiv = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 400;
  color: #b24020;
  font-family: Arial, Helvetica, sans-serif;
  padding: 75px;
  background-color: #f1ece5;
`;

const GreyDiv = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 400;
  color: #b24020;
  font-family: Arial, Helvetica, sans-serif;
  padding: 75px;
  background-color: hwb(40deg 94% 5%);
`;
