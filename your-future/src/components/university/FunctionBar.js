import React from "react";
import { Flex, Icon, Box, HStack, Input, Button } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

function FunctionBar({ handler }) {
  return (
    <Flex>
      <HStack mb={2}>
        <Button bgColor="red" color={"white"}>
          <Icon
            as={AiOutlineStar}
            mr={2}
            onClick={() => {
              handler();
            }}
          ></Icon>{" "}
          Write a Review
        </Button>
        <Button>
          <Icon as={BsBookmark} mr={2}></Icon> Save
        </Button>
      </HStack>
    </Flex>
  );
}

export default FunctionBar;
