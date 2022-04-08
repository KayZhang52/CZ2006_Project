import React from "react";
import { Heading, Box, Flex, Icon, VStack, HStack } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function TitleBox(props) {
  const { name, reviews } = props;
  return (
    <Flex direction={"column"} justify={"left"} mb="2rem">
      <Heading mb="1rem">{name}</Heading>
      <HStack>
        <Box>
          {Array.apply(null, { length: 5 }).map((e, i) => (
            <Icon key={i} as={BsStarFill}></Icon>
          ))}
        </Box>
        <Box>{reviews} reviews</Box>
      </HStack>
    </Flex>
  );
}

export default TitleBox;
