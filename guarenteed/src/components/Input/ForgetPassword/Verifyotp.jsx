import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Buttons/Button";
import axiosConfig from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { isNaN } from "lodash";
import Input from "../Input";

function Verifyotp() {
  const [time, settime] = useState(0);
  const [expire, setexpire] = useState("");
  const [mail, setmail] = useState("");
  const [isActive, setisActive] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    expireTime();
  }, []);

  useEffect(() => {
    let interval;
    if (expire) interval = setInterval(() => getTime(interval), 1000);
    return () => clearInterval(interval);
  }, [expire]);
  const getTime = (interval) => {
    const distance = new Date(expire).getTime() - new Date().getTime();
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    settime(minutes + ":" + seconds);

    if ((minutes <= 0 && seconds <= 0) || isNaN(minutes)) {
      setisActive(true);
      clearInterval(interval);
      settime(0 + ":" + 0);
      clearTimerandToken();
    }
  };
  const expireTime = async () => {
    try {
      const existingtime = await axiosConfig.get("/users/get-timing");
      if (!existingtime.data.error) {
        setexpire(existingtime.data.data?.[0]?.time);
        setmail(existingtime.data.data?.[1]?.username);
        existingtime.data.data?.[0]?.time
          ? setisActive(false)
          : setisActive(true);
      } else navigate("/forget-password");
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

  const clearTimerandToken = async () => {
    try {
      await axiosConfig.get("/users/clear-time-out");
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

  const resentOTP = async () => {
    try {
      const formData = {
        username: mail,
      };
      setIsLoading(true);
      const sentOTP = await axiosConfig.post("/users/sent-otp", formData);
      !sentOTP.data.error && expireTime();
      toast({
        title: sentOTP.data.messege,
        status: `${sentOTP.data.error ? `error` : `success`}`,
        duration: 3000,
        isClosable: true,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "something went wrong",
        status: `error`,
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const formData = {
        OTP,
        mail,
      };
      const data = await axiosConfig.post("/users/validate-otp", formData);
      if (!data.data.error) {
        toast({
          title: `${data.data.messege}`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
        navigate("/change-password", { replace: true });
      } else {
        toast({
          title: `${data.data.messege}`,
          status: `error`,
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "something went wrong",
        status: `error`,
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
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
              <p>Enter the OTP.</p>
              <div className="panel-body">
                <div>
                  <div className="input-group">
                    <Input
                      placeholder="OTP"
                      className="form-control"
                      type="Number"
                      onChange={(e) => setOTP(e.target.value)}
                      value={OTP}
                    />
                  </div>
                  ‎ {!isActive ? `OTP Expires ${time}` : "OTP Expired"}
                  {isActive && (
                    <p onClick={resentOTP} className="resent-text">
                      Resent OTP
                    </p>
                  )}
                </div>
                <Button onClick={verifyOTP}>Verify</Button>
              </div>
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

export default Verifyotp;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  display: flex;
  justify-content: center;
  justify-items: center;
  .resent-text {
    float: right;
    cursor: pointer;
    :hover {
      color: #14589d;
    }
  }
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
`;
const Subwrapper = styled.div``;
