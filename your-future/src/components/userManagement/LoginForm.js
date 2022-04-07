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
  Checkbox,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const { isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, openModal } =
    props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
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
      res.text().then((data) => {
        if (data == "successful") {
          openModal(true);
          setIsLoggedIn(true);
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
}

export default LoginForm;
