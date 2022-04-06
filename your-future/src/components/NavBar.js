import { Flex, HStack, Spacer, Button } from "@chakra-ui/react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";

function NavBar(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const part = (to, text) => {
    return (
      <Button>
        <Link to={to}>{text}</Link>
      </Button>
    );
  };

  const userRelated = !isLoggedIn ? (
    <HStack>
      {part("login", "Login")}
      {part("signup", "Sign Up")}
    </HStack>
  ) : (
    <HStack>
      {
        <Button
          onClick={() => {
            setIsLoggedIn(false);
            console.log("loginStatus: ", isLoggedIn);
          }}
        >
          Log Out
        </Button>
      }
    </HStack>
  );

  return (
    <Flex pb={"2rem"}>
      <HStack>
        {part("/", "Home")}
        {part("recommendation", "Get Recommendations")}
        {part("schools", "View Schools")}
        {part("test", "test")}
      </HStack>
      <Spacer></Spacer>
      {userRelated}
    </Flex>
  );
}

export default NavBar;
