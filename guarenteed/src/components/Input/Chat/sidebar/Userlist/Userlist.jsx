import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { API_URL } from "../../../../../config/axiosConfig";

function Userlist({ handleFunction, user }) {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <>
          <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.c_profile ? user.c_profile.name : user.u_profile.name}
            src={`${API_URL}images/${
              user.c_profile
                ? user.c_profile.profilePicture
                : user.u_profile.profilePicture
            }`}
          />
          <Box>
            <Text></Text>
            <Text fontSize="xs">
              {user.username}
              <br></br>
              <b>
                {user.c_profile ? user.c_profile.name : user.u_profile.name}
              </b>
            </Text>
          </Box>
        </>
      </Box>
    </>
  );
}

export default Userlist;
