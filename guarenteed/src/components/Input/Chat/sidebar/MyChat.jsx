import React, { useEffect, useState } from "react";
import { Box, Text, Stack } from "@chakra-ui/layout";
import styled from "styled-components";
import { ChatState } from "../../../../utils/ChatProvider";

function MyChat() {
  const [selectedChat, setSelectedChat] = useState("");
  const { getChats, mychats, setselectChat } = ChatState();
  useEffect(() => {
    getChats();
  }, []);
  const selectChat = (user) => {
    setSelectedChat(user);
    setselectChat(user._id);
  };
  return (
    <Wrapper>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", lg: "100%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Arial, Helvetica, sans-serif"
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          <Stack className="chatScroll" overflowY="scroll">
            {mychats.map((chat) => (
              <Box
                onClick={() => selectChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {chat.data.map((item, i) => {
                  const { name } =
                    item.role === "user" ? item.u_profile : item.c_profile;
                  return (
                    <div key={item._id}>
                      <Text>{item.username}</Text>
                      <Text fontSize="xs">
                        <b>{name}</b>
                      </Text>
                    </div>
                  );
                })}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Wrapper>
  );
}

export default MyChat;
const Wrapper = styled.div`
  .chatScroll {
    ::-webkit-scrollbar {
      width: 0px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(136, 136, 136, 0.281);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    min-height: 60vh !important;
    max-height: 60vh !important;
  }
`;
