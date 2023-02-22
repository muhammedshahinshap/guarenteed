import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Input/Chat/sidebar/Sidebar";
import MyChat from "../../components/Input/Chat/sidebar/MyChat";
import SingleChat from "../../components/Input/Chat/sidebar/Single Chat/SingleChat";
import styled from "styled-components";
import ChatProvider from "../../utils/ChatProvider";
import { setHeader } from "../../utils/setHeader";
import axiosConfig from "../../config/axiosConfig";
import { Spinner } from "@chakra-ui/spinner";
import { Link } from "react-router-dom";

function Chat() {
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
    <Wrapper>
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
          {status && user.premium ? (
            <ChatProvider>
              <Sidebar />
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <MyChat />
                </div>
                <div className="col-sm-6 col-md-7">
                  <SingleChat />
                </div>
              </div>
            </ChatProvider>
          ) : (
            status && (
              <H1>
                <Link to="/upgrade-account">Upgrade to Premium</Link>
              </H1>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Chat;
const Wrapper = styled.div`
  overflow: hidden;
`;
const H1 = styled.div`
  text-align: center;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  color: #0a58ca;
`;
