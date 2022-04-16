import React, { useEffect, useState } from "react";
import { Container, Box, Flex, Heading } from "@chakra-ui/react";
import { LineChart, Line, PieChart, Pie, ResponsiveContainer } from "recharts";
import frequency from "../utilities/frequency";
import { dummyData } from "../utilities/dummyData";

function RecommendationResult(props) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem("recommendations");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [chartData, setChartData] = useState(() => {
    return frequency("Location", results);
  });
  useEffect(() => {
    setChartData(() => {
      return frequency("Location", results);
    });
  }, [results]);
  //composition by country
  const renderPieChart = (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="country"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={50}
          fill="#8884d8"
          label={(entry) => {
            return entry.country;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
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
      <Flex direction="column">
        <Box className="graphsBox" bgColor="#EDF2F7" minH="0">
          Data Visualization:
          {renderPieChart}
        </Box>
        <Box className="recommendationBox" minH="1000px" textAlign={"center"}>
          <Heading>Our Recommendations</Heading>
          {results.map((entry, index) => {
            return (
              <p key={index}>
                {entry.Institution}: {entry.newScore.toFixed(2)}
              </p>
            );
          })}
        </Box>
      </Flex>
    </Container>
  );
}

export default RecommendationResult;
