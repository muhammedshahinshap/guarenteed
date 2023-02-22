import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import styled from "styled-components";
import { setHeader } from "../../../../utils/setHeader";
import axiosConfig from "../../../../config/axiosConfig";
import UserListItem from "./Userlist/Userlist";
import { ChatState } from "../../../../utils/ChatProvider";
import { useDispatch } from "react-redux";
import { auth } from "../../../../pages/ReduxToolkit/Auth";
function Sidebar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getChats } = ChatState();
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    setLoadingChat(true);
    let start;
    if (search) {
      start = setTimeout(async () => {
        let data = await axiosConfig.get(
          `/chat/search-user/${search}`,
          setHeader()
        );
        if (!data.data.error) {
          setSearchResult(data.data.data[0]);
        }
        dispatch(auth({ type: data.data.message, details: "" }));
        setLoadingChat(false);
      }, 500);
    } else {
      setLoadingChat(false);
      setSearchResult([]);
    }
    return () => {
      clearTimeout(start);
    };
  }, [search]);

  const selectChat = async (id) => {
    try {
      const formData = {
        id,
      };
      let data = await axiosConfig.post(
        `/chat/select-chat`,
        formData,
        setHeader()
      );
      dispatch(auth({ type: data.data.message, details: "" }));
      if (!data.data.error) {
        getChats();
        onClose();
      } else {
        toast({
          title: "Try again.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <SetChatNav>
        <Box w="100%" p="5px 10px 5px 10px" borderWidth="5px">
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen}>
              <i className="fas fa-search"></i>
              <Text d={{ base: "none", md: "flex" }} px={4}>
                Search User
              </Text>
            </Button>
          </Tooltip>
        </Box>
      </SetChatNav>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Search Users
            <CloseIcon
              onClick={onClose}
              w={8}
              h={8}
              color="red.500"
              float="right"
            />
          </DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {!loadingChat ? (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => selectChat(user._id)}
                />
              ))
            ) : (
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Wrapper>
  );
}

export default Sidebar;
const Wrapper = styled.div`
  background-color: #ffffff;
  .align-center {
    text-align: center;
  }
`;
const SetChatNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
