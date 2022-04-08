import React, { useEffect, useState } from "react";
import SearchBar from "../components/homepage/SearchBar";
import University from "../components/homepage/UniversityBadge";
import { Heading, Icon, Flex, Box } from "@chakra-ui/react";
import CompanyLogo from "../components/homepage/CompanyLogo";
import UniversityBadge from "../components/homepage/UniversityBadge";

function Home() {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState(["USA", "Singapore"]);
  useEffect(() => {
    fetch("/universities")
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data["data"]);
      });
  }, []);
  const display = universities.map((school, index) => {
    return (
      <UniversityBadge
        key={index}
        name={school.institution}
        location={school.location}
      ></UniversityBadge>
    );
  });

  return (
    <Box>
      {" "}
      <CompanyLogo></CompanyLogo>
      <SearchBar schools={universities}></SearchBar>
      <Flex direction={"row"} wrap="wrap" justify="space-evenly">
        {display}
      </Flex>
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
