import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaypalButton from "../../components/Input/Paypal/PaypalButton";
import axiosConfig from "../../config/axiosConfig";
import { setHeader } from "../../utils/setHeader";
import { Spinner } from "@chakra-ui/spinner";

function PremiumPayment() {
  const [user, setuser] = useState({});
  const [status, setstatus] = useState(false);

  useEffect(() => {
    userData();
  }, []);
  const userData = async () => {
    try {
      const data = await axiosConfig.get("/chat/user-data", setHeader());
      if (!data.data.error) {
        setuser(data.data.data[0]);
        setstatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper className="container">
      <div className="row mt-5 mb-5">
        <div className="col-sm-12">
          {!status && (
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
          )}
          {status && !user.premium ? (
            <div className="row mt-5 mb-5">
              <h1>Get Premium</h1>
              <p>Only $15 Lifetime</p>
              <p>Get access to unlimited people</p>
              <div className="col-sm-12 center-item">
                <PaypalButton />
              </div>
            </div>
          ) : (
            <h1>You already have premium</h1>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default PremiumPayment;
const Wrapper = styled.div`
  background-color: #f8f4ec;
  .center-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  p {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    margin-bottom: 10px;
  }
`;
