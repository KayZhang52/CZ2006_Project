import React from "react";
import SearchBar from "../components/homepage/SearchBar";
import University from "../components/homepage/UniversityBadge";
import { Heading, Icon, Flex, Box } from "@chakra-ui/react";
import CompanyLogo from "../components/homepage/CompanyLogo";

function Home() {
  return (
    <Box>
      {" "}
      <CompanyLogo></CompanyLogo>
      <SearchBar></SearchBar>
      <University
        name={"NTU"}
        rating={5}
        location={"Singapore"}
        imgSrc={
          "https://imageio.forbes.com/specials-images/imageserve/1209892117/Dunster-House/960x0.jpg?fit=bounds&format=jpg&width=960"
        }
      ></University>
    </Box>
  );
}

export default Home;
