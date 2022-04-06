import {
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      email: email,
      password: password,
    };
    fetch("/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userDetails),
    }).then((res) => {
      console.log("res: ", res);
      res.json().then((data) => {
        console.log(data);
        if ((data = "successful")) {
          props.setIsLoggedInStatus(true);
        }
      });
    });
  };
  return (
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
            <FormControl></FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="John@gmail.com"></Input>
          </GridItem>{" "}
          <GridItem colSpan={2}>
            <FormControl></FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="password123"></Input>
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
}

export default LoginForm;
