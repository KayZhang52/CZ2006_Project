import { Container } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [page, setPage] = useState("home");
  return (
    <Container maxW={"100%"}>
      <NavBar></NavBar>
      <Outlet />
    </Container>
  );
}

export default App;
