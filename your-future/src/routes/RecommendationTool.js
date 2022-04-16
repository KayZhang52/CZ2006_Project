import React, { useState } from "react";
import { Container, Image } from "@chakra-ui/react";
import RecommendationsForm from "../components/homepage/RecommendationsForm";

function RecommendationTool() {
  return (
    <Container minW="100vw">
      <Image
        src={process.env.PUBLIC_URL + "/images/schoolBg.jpg"}
        position="fixed"
        mt="-8.3rem"
        ml="-1rem"
        minW="100vw"
        minH="100vh"
        fit="stretch"
        zIndex="-1"
      ></Image>
      <div>Recommendation Tool</div>
      <RecommendationsForm></RecommendationsForm>
    </Container>
  );
}

export default RecommendationTool;
