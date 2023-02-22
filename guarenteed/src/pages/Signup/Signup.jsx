import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Button from "../../components/Input/Buttons/Button";
import ButtonDanger from "../../components/Input/Buttons/ButtonDanger";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axiosConfig";
import PasswordInput from "../../components/Input/PasswordInput";
import { useToast } from "@chakra-ui/react";
function Signup() {
  const toast = useToast();
  const [username, setusername] = useState("");
  const [userstatus, setuserstatus] = useState(false);
  const [password, setpassword] = useState("");
  const [passstatus, setpassstatus] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [confirmpassstatus, setconfirmpassstatus] = useState(false);

  const navigate = useNavigate();

  const clearAll = () => {
    setusername("");
    setuserstatus(false);
    setpassword("");
    setpassstatus(false);
    setconfirmpassword("");
    setconfirmpassstatus(false);
  };

  const saveUser = async () => {
    try {
      if (
        username &&
        password &&
        confirmpassword &&
        userstatus &&
        passstatus &&
        confirmpassstatus
      ) {
        const formData = {
          username,
          password,
          role: "",
          status: 1,
          forgetPassword: "",
          profile: {},
        };

        const res = await axiosConfig.post("users/register", formData);

        toast({
          title: `${res.data.error ? "Try again" : "Successfully Completed"}`,
          status: `${res.data.error ? "error" : "success"}`,
          duration: 3000,
          isClosable: true,
        });

        clearAll();

        if (!res.data.error) navigate("/");
      } else {
        toast({
          title: "Please fill the fields perfectly",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        if (!userstatus) throw "username";
        else if (!passstatus) throw "password";
        else if (!confirmpassstatus) throw "confirmpassword";
      }
    } catch (error) {
      if (
        error === "username" ||
        error === "password" ||
        error === "confirmpassword"
      )
        document.getElementById(error).focus();
      else console.log(error);
    }
  };

  useEffect(() => {
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@gmail.com$/i;
    const res = regex.test(username);
    if (res) setuserstatus(res);
    else if (userstatus) setuserstatus(res);
  }, [username, userstatus]);

  useEffect(() => {
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/i;
    const res = regex.test(password);
    if (res) setpassstatus(res);
    else if (passstatus) setpassstatus(res);
  }, [password, passstatus]);

  useEffect(() => {
    if (password) {
      if (confirmpassword === password) setconfirmpassstatus(true);
      else setconfirmpassstatus(false);
    }
  }, [confirmpassword, password]);

  return (
    <Wrapper className="container-fluid">
      <Card>
        <H2>Sign Up</H2>
        <label>Username : (G-Mail)</label>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="form-control mt-0"
          id="username"
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
        <P>{!userstatus && username ? "Please Enter a Valid E Mail" : ""}</P>
        <label>Password :</label>
        <PasswordInput
          type="password"
          placeholder="Password"
          className="form-control mt-0"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
        <P>{!passstatus && password ? "Please Enter a Strong Password" : ""}</P>
        <label>Confirm Password :</label>
        <PasswordInput
          type="password"
          placeholder="Password"
          className="form-control mt-0"
          id="confirmpassword"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
        <P>
          {!confirmpassstatus && confirmpassword
            ? "Confirm Password and Password Doesn't Match"
            : ""}
        </P>
        <Button className="btn-adj mt-3" onClick={saveUser}>
          Submit
        </Button>
        <ButtonDanger className="btn-adj" onClick={() => navigate(-1)}>
          Back
        </ButtonDanger>
      </Card>
    </Wrapper>
  );
}

export default Signup;
const Wrapper = styled.div`
  .btn-adj {
    width: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f1ece5;
  .adj-left {
    margin-left: 10px;
  }
  label {
    margin-top: 10px;
  }
`;
const Card = styled.div`
  border: 1px solid #eeeeee;
  padding: 30px 50px 50px 50px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 4px 0rem rgb(16 66 139 / 29%);
  @media (max-width: 450px) {
    padding: 35px;
  }
`;
const H2 = styled.h2`
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const P = styled.p`
  color: red;
  padding: 0px;
  margin: 0px;
  font-size: 10px;
  font-weight: 600;
  font-style: italic;
`;
