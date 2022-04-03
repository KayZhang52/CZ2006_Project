import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Review from "../components/Review";
const { useEffect } = require("react");

function UniversityHome(props) {
  const [data, setData] = useState([]);
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
      <Image src="https://billfish.org/wp-content/uploads/2019/08/placeholder-image-1030x773.jpg"></Image>
      <Flex className="UniversityHome" justify={"space-around"}>
        <VStack grow={2}>
          {" "}
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
        </VStack>
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
