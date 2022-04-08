import {
  HStack,
  VStack,
  Container,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

function Review({ username, comment, rating, dateTime }) {
  useEffect(() => {
    console.log(dateTime);
  });
  return (
    <Container
      pb={"1rem"}
      mt={"1rem"}
      mb={"1rem"}
      ml={0}
      style={{ boxShadow: "0 30px 40px rgba(0,0,0,.1)" }}
    >
      <Flex justify={"flex-start"} direction="row">
        <VStack justify={"flex-start"} w={"5rem"}>
          <Avatar
            src="https://www.gannett-cdn.com/presto/2020/07/29/USAT/73d9330f-c382-4123-a56d-d61eefb2c373-AP_NY_Premiere_of_Netflixs__6_Underground_.JPG?width=660&height=440&fit=crop&format=pjpg&auto=webp"
            size="xs"
          ></Avatar>
          <Text>{username}</Text>
        </VStack>
        <VStack>
          <HStack justify={"flex-start"} w={"100%"}>
            {" "}
            <Text>
              {"\u2605".repeat(rating)}
              {"\u2606".repeat(5 - rating)}
            </Text>
            {dateTime == null ? "" : <Text>reviewed on {dateTime}</Text>}
          </HStack>

          <Text>{comment}</Text>
        </VStack>
      </Flex>
    </Container>
  );
}
export default Review;
