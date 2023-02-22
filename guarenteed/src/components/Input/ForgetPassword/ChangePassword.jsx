import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosConfig from "../../../config/axiosConfig";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button as CButton,
} from "@chakra-ui/react";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function ChangePassword() {
  const [show, setshow] = useState(false);
  const [currentshow, setcurrentshow] = useState(false);
  const [username, setusername] = useState("");
  const [validator, setvalidator] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [PasswordStatus, setPasswordStatus] = useState(true);
  const [confirmPasswordSattus, setconfirmPasswordSattus] = useState(true);
  const toast = useToast();

  const navigate = useNavigate();
  const showPassword = () => {
    setshow(!show);
  };
  const showConfirmPassword = () => {
    setcurrentshow(!currentshow);
  };
  const getEmail = async () => {
    try {
      const data = await axiosConfig.get("/users/get-mail");
      if (data.data.data?.[0] && data.data.data?.[1]) {
        setusername(data.data.data?.[0]);
        setvalidator(data.data.data?.[1]);
        return true;
      } else clearAll();
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: `error`,
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  const clearAll = async () => {
    try {
      const data = await axiosConfig.get("/users/clear-all");
      !data.data.error && navigate("/", { replace: true });
      data.data.error &&
        toast({
          title: "Something went wrong",
          status: `error`,
          duration: 3000,
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: `error`,
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/i;
    let res = regex.test(password);
    setPasswordStatus(res);
    !password && setPasswordStatus(true);
  }, [password]);

  useEffect(() => {
    if (password) {
      if (confirmpassword === password) setconfirmPasswordSattus(true);
      else setconfirmPasswordSattus(false);
      !confirmpassword && setconfirmPasswordSattus(true);
    }
  }, [confirmpassword]);

  const resetPassword = async () => {
    const validate = await getEmail();
    try {
      if (
        password &&
        confirmpassword &&
        PasswordStatus &&
        confirmPasswordSattus &&
        validator &&
        username &&
        validate
      ) {
        const formData = {
          username,
          password,
        };
        const data = await axiosConfig.post("/users/reset-password", formData);
        if (!data.data.error) {
          clearAll();
        }
        toast({
          title: data.data.message,
          status: `${data.data.error ? `error` : `success`}`,
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: `error`,
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <div>
      <Wrapper>
        {username && validator ? (
          <Subwrapper className="row mt-5 mb-5">
            <Card>
              <div className="text-center pt-2 pb-2 mt-5 mb-5">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center mt-2">Change Password?</h2>
                <div className="panel-body">
                  <div className="mt-3">
                    <InputGroup size="lg">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                        value={password}
                      />
                      <InputRightElement width="4.5rem">
                        <CButton size="xs" onClick={showPassword}>
                          {show ? "Hide" : "Show"}
                        </CButton>
                      </InputRightElement>
                    </InputGroup>
                    {!PasswordStatus && <p>Enter a strong password</p>}
                  </div>
                  <div className="mt-3">
                    <InputGroup size="lg">
                      <Input
                        pr="4.5rem"
                        type={currentshow ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => {
                          setconfirmpassword(e.target.value);
                        }}
                        value={confirmpassword}
                      />
                      <InputRightElement width="4.5rem">
                        <CButton size="xs" onClick={showConfirmPassword}>
                          {currentshow ? "Hide" : "Show"}
                        </CButton>
                      </InputRightElement>
                    </InputGroup>
                    {!confirmPasswordSattus && <p>Password doesn't match</p>}
                  </div>
                </div>
                <Button onClick={resetPassword} className="btn-verify">
                  Confirm password
                </Button>
              </div>
            </Card>
          </Subwrapper>
        ) : (
          <Link to="/">
            <p style={{ textAlign: "center", color: "red" }}>
              <b>Somthing went wrong please Try again</b>
            </p>
          </Link>
        )}
      </Wrapper>
    </div>
  );
}

export default ChangePassword;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  display: flex;
  justify-content: center;
  justify-items: center;
  .btn-verify {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
`;
const Subwrapper = styled.div``;
