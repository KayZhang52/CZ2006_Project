//a navigation component with switching pages
import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

function HomeComponent1() {
  return (
    <Flex
      minW="80%"
      align={"center"}
      direction="column"
      className="c1"
      mb="5rem"
    >
      <Heading mt="3rem" mb="1rem">
        Recent Activity
      </Heading>
      <Flex>
        <Box
          p="1rem"
          _hover={{ borderBottom: "4px solid red" }}
          fontSize="1.7rem"
        >
          Latest
        </Box>{" "}
        <Box
          p="1rem"
          _hover={{ borderBottom: "4px solid red" }}
          fontSize="1.7rem"
        >
          Top Schools
        </Box>{" "}
        <Box
          p="1rem"
          _hover={{ borderBottom: "4px solid red" }}
          fontSize="1.7rem"
        >
          Bookmark
        </Box>
      </Flex>
    </Flex>
  );
}

export default HomeComponent1;
