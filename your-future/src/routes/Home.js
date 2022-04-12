import React, { useEffect, useState } from "react";
import SearchBar from "../components/homepage/SearchBar";
import University from "../components/homepage/UniversityBadge";
import { Heading, Icon, Flex, Box } from "@chakra-ui/react";
import CompanyLogo from "../components/homepage/CompanyLogo";
import UniversityBadge from "../components/homepage/UniversityBadge";

function Home() {
  const [universityList, setUniversityList] = useState([]);
  const [searchParams, setSearchParams] = useState({
    inputValue: "",
    country: "",
    course: "",
  });
  useEffect(() => {
    const url = [
      "/universities?",
      "country=",
      searchParams.country,
      "&course=",
      searchParams.course,
      "&keyword=",
      searchParams.inputValue,
    ].join("");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUniversityList(data["data"]);
      });
  }, [searchParams]);
  const display = universityList.map((school, index) => {
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
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      ></SearchBar>
      <Flex direction={"row"} wrap="wrap" justify="space-evenly">
        {display}
      </Flex>
    </Box>
  );
}

export default Home;
