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
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function LoginForm(props) {
  const [isLoggedIn, setIsLoggedIn, userDetails, setUserDetails] =
    useOutletContext();
  const { loginHandler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
      res.text().then((data) => {
        console.log(data);
        if ((data = "successful")) {
          loginHandler(true);
          setIsLoggedIn(true);
          console.log("isLoggedin: ", isLoggedIn);
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
            <Input
              placeholder="John@gmail.com"
              onChange={handleEmailChange}
            ></Input>
          </GridItem>{" "}
          <GridItem colSpan={2}>
            <FormControl></FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password123"
              onChange={handlePasswordChange}
            ></Input>
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
