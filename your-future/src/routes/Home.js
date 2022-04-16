import React, { useEffect, useState } from "react";
import SearchBar from "../components/homepage/SearchBar";
import University from "../components/homepage/UniversityBadge";
import { Heading, Icon, Flex, Box, Image } from "@chakra-ui/react";
import CompanyLogo from "../components/homepage/CompanyLogo";
import UniversityBadge from "../components/homepage/UniversityBadge";
import HomeComponent1 from "../components/HomeComponent1";

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
    console.log(url);
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
    <Box textAlign={"center"}>
      {" "}
      <Image
        src={process.env.PUBLIC_URL + "/images/bannerv2.jpg"}
        fit="contain"
        position={"absolute"}
        zIndex="-1"
        w="100%"
        mt="-13rem"
      ></Image>
      <CompanyLogo></CompanyLogo>
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      ></SearchBar>
      <Box minW="100%" minH="107px"></Box>
      <HomeComponent1></HomeComponent1>
      <Box w="100%" minH="1px" bg="#EBEBEB"></Box>
      <Heading mt="3rem" mb="1rem">
        Search Results
      </Heading>
      <Flex
        maxW="70%"
        align={"center"}
        direction="row"
        wrap={"wrap"}
        basis="50rem"
        m="0 auto"
        gap="0 6rem"
        p="3rem 0"
        className="weird"
        justify={"space-around"}
      >
        {display}
      </Flex>
    </Box>
  );
}

export default Home;
