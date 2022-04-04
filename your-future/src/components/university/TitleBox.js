import React from "react";
import { Heading, Box, Flex, Icon, VStack, HStack } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function TitleBox(props) {
  return (
    <Flex direction={"column"} justify={"left"}>
      <Heading>Placeholder University</Heading>
      <HStack>
        <Box>
          {Array.apply(null, { length: 5 }).map((e, i) => (
            <Icon as={BsStarFill}></Icon>
          ))}
        </Box>
        <Box>10 reviews</Box>
      </HStack>
      <HStack>Asia's number one university</HStack>
    </Flex>
  );
}

export default TitleBox;
