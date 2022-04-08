import { Button, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function LoginPage(props) {
  //state variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("green");
  const [msg, setMsg] = useState("red");

  //test
  useEffect(() => {
    // console.log(props);
  });

  //hooks and handlers
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    if (email == "" || password == "") {
      return;
    }
    e.preventDefault();
    const loginInfo = {
      email: email,
      password: password,
    };
    fetch("/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginInfo),
    }).then((res) => {
      res.json().then((data) => {
        if (data["loginStatus"] == "successful") {
          setTheme("green");
          localStorage.setItem("login", "true");
          localStorage.setItem(
            "userDetails",
            JSON.stringify(data["userDetails"])
          );
        } else setTheme("red");

        setMsg(data["loginStatus"]);
        //open popup
        onOpen();
      });
    });
  };

  //components
  const popUp = (msg, theme) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{msg}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              colorScheme={theme}
              mr={3}
              onClick={() => {
                navigate("/");
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  const loginForm = (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      bg="gray.50"
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2x1">Login</Heading>
      </VStack>
      <VStack
        w="full"
        h="full"
        p={10}
        spacing={10}
        alignItems="flex-start"
        bg="gray.50"
        className="abc"
      >
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full ">
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="example@gmail.com"
                onChange={handleEmailChange}
              ></Input>
            </FormControl>
          </GridItem>{" "}
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password123"
                onChange={handlePasswordChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Checkbox defaultChecked>remember me</Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            <Button size="lg" w="full" onClick={handleSubmit}>
              Login
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </VStack>
  );

  return (
    <Container>
      {loginForm}
      {popUp(msg, theme)}
    </Container>
  );
}

export default LoginPage;
