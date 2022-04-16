import {
  Flex,
  HStack,
  Spacer,
  Button,
  Text,
  Icon,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import CompanyLogo from "./homepage/CompanyLogo";
import { SiGooglescholar } from "react-icons/si";
import { registerables } from "chart.js";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true" ? true : false
  );
  const [userDetails, setUserDetails] = useState({ username: "" });
  useEffect(() => {
    try {
      setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    } catch {}
    window.addEventListener("storage", () => {
      setIsLoggedIn(localStorage.getItem("login") === "true" ? true : false);
    });
  }, []);

  const part = (to, text) => {
    return (
      <Button
        className="navBtn"
        bg="rgba(0,0,0,0)"
        color="white"
        _hover={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Link to={to}>{text}</Link>
      </Button>
    );
  };
  const userRelated = !isLoggedIn ? (
    <HStack mr="2rem">
      <Button>
        <Link to="Login">Login</Link>
      </Button>
      <Button bg="red" color="white">
        <Link to="Signup">Sign up</Link>
      </Button>
    </HStack>
  ) : (
    <HStack>
      <Icon as={BiUserCircle}></Icon>
      <Text>{userDetails["username"]}</Text>

      <Button
        onClick={() => {
          localStorage.setItem("login", "false");
          setIsLoggedIn(false);
        }}
      >
        Log Out
      </Button>
    </HStack>
  );

  return (
    <Flex pb={"2rem"} align="center">
      <Flex
        direction={"horizontal"}
        h="100px"
        align="center"
        justify="center"
        pr="1rem"
        pl="1rem"
      >
        <Heading color="white" size="2xl">
          Your Future
        </Heading>
        <Icon as={SiGooglescholar} boxSize={"2rem"} color="white"></Icon>
      </Flex>
      <HStack>
        {part("/", "Home")}
        {part("recommendation", "Get Recommendations")}
        {part("schools", "View Schools")}
      </HStack>
      <Spacer></Spacer>
      {userRelated}
    </Flex>
  );
}

export default NavBar;
