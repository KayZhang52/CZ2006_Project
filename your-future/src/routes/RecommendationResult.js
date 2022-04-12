import React, { useEffect, useState } from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import { LineChart, Line, PieChart, Pie } from "recharts";
import frequency from "../utilities/frequency";
import { dummyData } from "../utilities/dummyData";

function RecommendationResult(props) {
  const [results, setResults] = useState();
  useEffect(() => {
    // setResults(localStorage.getItem("recommendations"));
  });

  const renderLineChart = (
    <LineChart data={results}>
      <Line type="monotone" dataKey="score"></Line>
    </LineChart>
  );
  //composition by country
  const renderPieChart = (
    <PieChart width={730} height={250}>
      <Pie
        data={dummyData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
      />
    </PieChart>
  );
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
        <Box className="graphsBox" bgColor="#EDF2F7" flex={1} minH="1000px">
          Data Visualization:
          {renderLineChart}
          {renderPieChart}
        </Box>
        <Box className="recommendationBox" flex={1} minH="1000px">
          Our Recommendations
          {results.map((entry, index) => {
            return <p key={index}>{entry.institution}</p>;
          })}
        </Box>
      </Flex>
    </Container>
  );
}

export default RecommendationResult;
