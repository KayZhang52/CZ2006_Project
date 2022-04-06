import React, { useEffect, useState } from "react";
import SearchBar from "../components/homepage/SearchBar";
import University from "../components/homepage/UniversityBadge";
import { Heading, Icon, Flex, Box } from "@chakra-ui/react";
import CompanyLogo from "../components/homepage/CompanyLogo";
import UniversityBadge from "../components/homepage/UniversityBadge";

function Home() {
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    fetch("/universities")
      .then((res) => res.json())
      .then((data) => {
        setUniversities(JSON.parse(data["data"]));
      });
  }, []);
  const display = universities.map((object, index) => {
    return (
      <UniversityBadge
        key={index}
        name={object.name}
        rating={object.rating}
        location={object.country}
      >
        {object["name"]}
      </UniversityBadge>
    );
  });

  return (
    <Box>
      {" "}
      <CompanyLogo></CompanyLogo>
      <SearchBar></SearchBar>
      {display}
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
