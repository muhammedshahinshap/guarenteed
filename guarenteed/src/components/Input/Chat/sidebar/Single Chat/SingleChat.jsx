import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import styled from "styled-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ChatState } from "../../../../../utils/ChatProvider";
import axiosConfig from "../../../../../config/axiosConfig";
import { setHeader } from "../../../../../utils/setHeader";
import { auth } from "../../../../../pages/ReduxToolkit/Auth";

const ENDPOINT = "https://guarenteed.tech/";
let socket;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, userData, selectChat } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  let viewChat = selectChat.length > 0 ? true : false;
  const dispatch = useDispatch();
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, [user]);
  useEffect(() => {
    socket.on("message-recieved", (newMsgRecieved) => {
      setMessages([...messages, newMsgRecieved]);
    });
  });
  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    viewChat && scrollAuto();
  }, [messages]);

  useEffect(() => {
    getChatData();
  }, [selectChat]);

  const getChatData = async () => {
    try {
      setLoading(true);
      const data = await axiosConfig.get(
        `/chat/get-chat-data/${selectChat}`,
        setHeader()
      );
      setMessages(data.data.data[0]);
      dispatch(auth({ type: data.data.message, details: "" }));
      socket.emit("start-chat", selectChat);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const formData = {
          newMessage,
          selectChat,
        };
        const data = await axiosConfig.post(
          "/chat/sent-message",
          formData,
          setHeader()
        );
        if (data.data.error) {
          alert("Issue occured While sending messeage");
        } else {
          socket.emit("new-message", data.data.data);
          setMessages([...messages, data.data.data[0]]);
        }
        dispatch(auth({ type: data.data.message, details: "" }));
        setNewMessage("");
        scrollAuto();
      } catch (error) {
        console.log(error);
        alert("Something went Wrong");
      }
    }
  };
  const ref = useRef();
  const scrollAuto = () => {
    const scroll = ref.current.scrollHeight - ref.current.clientHeight;
    ref.current.scrollTo(0, scroll);
  };
  return (
    <>
      {viewChat ? (
        <Wrapper ref={ref}>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          ></Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            minHeight="80vh"
          >
            {loading ? (
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
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>
          <FormControl
            onKeyDown={sendMessage}
            id="first-name"
            isRequired
            mt={3}
          >
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value.trimStart())}
            />
          </FormControl>
        </Wrapper>
      ) : (
        <Box
          margin="auto"
          alignItems="center"
          display="flex"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
const Wrapper = styled.div`
  min-height: 75vh !important;
  max-height: 75vh !important;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.281);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
