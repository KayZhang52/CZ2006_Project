import { Flex, HStack, Spacer, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const part = (to, text) => {
    return (
      <Button>
        <Link to={to}>{text}</Link>
      </Button>
    );
  };
  return (
    <Flex pb={"2rem"}>
      <HStack>
        {part("/", "Home")}
        {part("recommendation", "Get Recommendations")}
        {part("reviews", "View Schools")}
        {part("test", "test")}
      </HStack>
      <Spacer></Spacer>
      <HStack>
        {part("login", "Login")}
        {part("signup", "Sign Up")}
      </HStack>
    </Flex>
  );
}

export default NavBar;
