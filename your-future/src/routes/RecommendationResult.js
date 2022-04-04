import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";

function RecommendationResult(props) {
  return (
    <Container maxW="100%">
      <Box
        className="Banner"
        w="100%"
        minH="5rem"
        bgColor="#3AC0FF"
        textAlign={"left"}
        color="white"
        fontWeight={"bold"}
        pt="1.5rem"
        pb="1.5rem"
        pl="1rem"
      >
        My Matches
      </Box>
      <Flex>
        <Box className="filterDetailsBox" flex={1} minH="1000px">
          Filters:
        </Box>
        <Box className="graphsBox" bgColor="#EDF2F7" flex={1} minH="1000px">
          Data Visualization
        </Box>
        <Box className="recommendationBox" flex={1} minH="1000px">
          Our Recommendations
        </Box>
      </Flex>
    </Container>
  );
}

export default RecommendationResult;
