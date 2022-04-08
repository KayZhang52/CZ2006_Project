import { Flex, HStack, Spacer, Button, Text, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";

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
  /**
   *
   *  localStorage[user] has structure of
   * {
   *    'login',
   *    'userDetails':'....................'
   * }
   */

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
    <Flex pb={"2rem"}>
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
