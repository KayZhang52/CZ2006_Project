import { Button, Container, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/userManagement/SignUpForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function SignUpPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <Container className="lol" minW="100vw">
      <Image
        src={process.env.PUBLIC_URL + "/images/schoolBg.jpg"}
        position="fixed"
        mt="-8.3rem"
        ml="-1rem"
        minW="100vw"
        minH="100vh"
        fit="stretch"
        zIndex="-1"
      ></Image>
      <SignUpForm signupHandler={onOpen} margin="0 auto"></SignUpForm>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={() => navigate("/")}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default SignUpPage;
