import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import styled from "styled-components";

function CustAlertDialog({ label, custFunction, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const approve = (fun, id) => {
    onClose();
    fun(id);
  };
  return (
    <Wrapper>
      <i onClick={onOpen} className="fa-solid fa-ban"></i>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {label}
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  approve(custFunction, id);
                }}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Wrapper>
  );
}

export default CustAlertDialog;
const Wrapper = styled.div`
  .fa-ban {
    color: #d70e0e !important;
    :hover {
      color: red !important;
    }
  }
`;
