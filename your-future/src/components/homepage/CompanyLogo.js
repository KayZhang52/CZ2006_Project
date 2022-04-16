import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { SiGooglescholar } from "react-icons/si";

function CompanyLogo() {
  return (
    <Flex direction={"horizontal"} h="100px" align="center" justify="center">
      <Heading color="white" size="4xl">
        Your Future
      </Heading>
      <Icon as={SiGooglescholar} boxSize={"3rem"} color="white"></Icon>
    </Flex>
  );
}

export default CompanyLogo;
