import { Box, Container, Image } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });
  return (
    <Container maxW="100vw" minH="100vh" p="0">
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      ></NavBar>

      <Outlet
        context={[isLoggedIn, setIsLoggedIn, userDetails, setUserDetails]}
      />
    </Container>
  );
}

export default App;
