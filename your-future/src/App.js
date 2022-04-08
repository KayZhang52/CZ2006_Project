import { Container } from "@chakra-ui/react";
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
    <Container
      className="greyContainer"
      bg="#a0aec0"
      minW="100vw"
      m="0"
      position={"relative"}
    >
      <Container bg="white" m="auto" maxW={"60rem"} minH="100vh">
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
    </Container>
  );
}

export default App;
