import { Box, Container, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import FunctionBar from "../components/university/FunctionBar";
import TitleBox from "../components/university/TitleBox";
import Review from "../components/university/Review";
const { useEffect } = require("react");

function UniversityHome(props) {
  const [data, setData] = useState([]);
  const uniName = useState("Name not Found.");
  const [rating, setRating] = useState(5);
  const getData = () => {
    fetch("./data/Appliances_5.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const [address, setAddress] = useState("Address Not Found");
  const [email, setEmail] = useState("example@yahoo.com");
  return (
    <Box>
      <TitleBox></TitleBox>
      <Flex className="UniversityHome" justify={"space-around"}>
        <Flex grow={2} justify="left" direction={"column"}>
          <FunctionBar></FunctionBar>{" "}
          {data.slice(0, 100).map((entry, index) => {
            return (
              <Review
                username={entry.reviewerName}
                comment={entry.summary}
                rating={entry.overall}
                key={index}
              ></Review>
            );
          })}
        </Flex>
        <VStack grow={1}>
          <Box
            border="1px"
            pos="sticky"
            top={"1rem"}
            p="5px"
            borderColor="#A0AEC0"
          >
            <Box>{address}</Box>
            <Box
              w="100%"
              bgColor="#A0AEC0"
              minH="1px"
              mt="1rem"
              mb="1rem"
            ></Box>
            <Box>{email}</Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}

export default UniversityHome;
