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
    <Container maxW={"100%"}>
      <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></NavBar>
      <Outlet
        context={[isLoggedIn, setIsLoggedIn, userDetails, setUserDetails]}
      />
    </Container>
  );
}

export default App;
