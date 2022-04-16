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
import { useNavigate } from "react-router-dom";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [currentUniversity, setCurrentUniversity] = useState("nil");
  const navigateTo = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  const handleCurrentUniversityChange = (e) =>
    setCurrentUniversity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      country: country,
      currentUniversity: currentUniversity,
    };
    fetch("/user/signup", {
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
          navigateTo("/");
        }
      });
    });
  };

  return (
    <VStack
      w="40rem"
      bg="rgba(237,242,247,0.5)"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2x1">Sign Up</Heading>
        <Text>If you already have an account, click here.</Text>
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
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="JohnNTU"
                onChange={handleUsernameChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>email</FormLabel>
              <Input
                placeholder="john@gmail.com"
                onChange={handleEmailChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password123"
                onChange={handlePasswordChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="John"
                onChange={handleFirstNameChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Doe" onChange={handleLastNameChange}></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="Singapore"
                onChange={handleCityChange}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select onChange={handleCountryChange}>
                <option value="usa">United States</option>
                <option value="de">Germany</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel onChange={handleCurrentUniversityChange}>
                Current University (if any)
              </FormLabel>
              <Input placeholder="Nanyang Technological University"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Checkbox defaultChecked>Current Student</Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            <Button size="lg" w="full" onClick={handleSubmit}>
              Sign Up
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
export default SignUpForm;
