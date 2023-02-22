import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/react";
import Input from '../Input'
function ForgetPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setemail] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const sentMail = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        username: email,
      };
      setIsLoading(true);
      const sentOTP = await axiosConfig.post("/users/sent-otp", formData);
      toast({
        title: sentOTP.data.messege,
        status: `${sentOTP.data.error ? `error` : `success`}`,
        duration: 3000,
        isClosable: true,
      });
      if (!sentOTP.data.error) navigate("/verify-otp");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Wrapper>
      {!IsLoading && (
        <Subwrapper className="row mt-5 mb-5">
          <Card>
            <div className="text-center pt-2 pb-2 mt-5 mb-5">
              <h3>
                <i className="fa fa-lock fa-4x"></i>
              </h3>
              <h2 className="text-center mt-3">Forgot Password?</h2>
              <p>Enter your email here.</p>
              <form
                onSubmit={(e) => {
                  sentMail(e);
                }}
              >
                <div className="panel-body">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope color-blue"></i>
                    </span>
                    <Input
                      placeholder="Email address"
                      className="form-control mt-3"
                      type="email"
                      onChange={(e) => setemail(e.target.value)}
                      value={email}
                      required={true}
                    />
                  </div>
                  <Button type="submit">Get OTP</Button>
                </div>
              </form>
            </div>
          </Card>
        </Subwrapper>
      )}
      {IsLoading && (
        <div className="spinner">
          <Spinner
            size="xl"
            w={100}
            h={100}
            justifyContent="center"
            display="flex"
            margin="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </div>
      )}
    </Wrapper>
  );
}

export default ForgetPassword;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  display: flex;
  justify-content: center;
  justify-items: center;
  font-family: Arial, Helvetica, sans-serif;
  .spinner {
    margin-top: 80px;
    margin-bottom: 80px;
  }
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
`;
const Subwrapper = styled.div``;
