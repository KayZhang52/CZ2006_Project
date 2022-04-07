import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  VStack,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FunctionBar from "../components/university/FunctionBar";
import TitleBox from "../components/university/TitleBox";
import Review from "../components/university/Review";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
const { useEffect } = require("react");

export function submitReview(comment, rating, username, university) {
  fetch("/reviews?", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      comment: comment,
      rating: rating,
      username: username,
      university: university,
    }),
  }).then((res) => {
    res.text().then((data) => {
      if ((data = "successful")) {
        return;
      }
    });
  });
}

export function BasicUsage(props) {
  const { school } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleRatingChange = (val) => setRating(val);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your review of {school}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Flex direction="column" m="1.5rem">
              <FormControl as="fieldset">
                <FormLabel>Write your thoughts about {school}</FormLabel>
                <Input size="lg" onChange={handleCommentChange}></Input>
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel>How would you rate this university?</FormLabel>
                <Slider
                  defaultValue={3}
                  min={1}
                  max={5}
                  step={1}
                  onChange={handleRatingChange}
                >
                  <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                    1
                  </SliderMark>{" "}
                  <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                    2
                  </SliderMark>{" "}
                  <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                    3
                  </SliderMark>{" "}
                  <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
                    4
                  </SliderMark>{" "}
                  <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
                    5
                  </SliderMark>
                  <SliderTrack bg="red.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                submitReview(comment, rating, username, school);
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function UniversityHome(props) {
  const [schoolData, setSchoolData] = useState({});
  const [reviews, setReviews] = useState([]);

  const { school } = useParams();

  const initializeStates = () => {
    fetch("/university?institution=".concat(school)).then((res) => {
      res.json().then((data) => {
        setSchoolData(data["data"]);
      });
    });
    fetch("/reviews?institution=".concat(school)).then((res) => {
      res.json().then((data) => {
        setReviews(data["data"]);
      });
    });
  };
  useEffect(initializeStates, []);

  const [address, setAddress] = useState("Address Not Found");
  const [email, setEmail] = useState("Email not found");
  return (
    <Box>
      <p>{JSON.stringify(schoolData)}</p>
      <TitleBox name={school} reviews={10}></TitleBox>
      <Flex className="UniversityHome" justify={"space-around"}>
        <Flex grow={2} justify="left" direction={"column"}>
          <FunctionBar></FunctionBar>{" "}
          {reviews.map((entry, index) => {
            return (
              <Review
                username={entry.reviewerName}
                comment={entry.summary}
                rating={entry.overall}
                key={index}
              ></Review>
            );
          })}
        </Flex>
        <VStack grow={1}>
          <Box
            border="1px"
            pos="sticky"
            top={"1rem"}
            p="5px"
            borderColor="#A0AEC0"
          >
            <Box>{address}</Box>
            <Box
              w="100%"
              bgColor="#A0AEC0"
              minH="1px"
              mt="1rem"
              mb="1rem"
            ></Box>
            <Box>{email}</Box>
          </Box>
        </VStack>
      </Flex>
      <BasicUsage school={schoolData.institution} />
    </Box>
  );
}

export default UniversityHome;
