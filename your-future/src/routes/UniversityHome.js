import {
  Box,
  Container,
  Flex,
  VStack,
  Button,
  useDisclosure,
  Input,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
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
import { AiOutlineStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import ReviewSearchBar from "../components/university/ReviewSearchBar";
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
    res.text().then((data) => {});
  });
}

function UniversityHome(props) {
  const [schoolData, setSchoolData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("Address Not Found");
  const [email, setEmail] = useState("Email not found");
  const { school } = useParams();
  const [searchParams, setSearchParams] = useState({
    inputValue: "*",
    sortBy: "Newest First",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCommentChange = (e) => setComment(e.target.value);
  const handleRatingChange = (v) => setRating(v);

  const initializeStates = () => {
    try {
      setUsername(JSON.parse(localStorage.getItem("userDetails"))["username"]);
    } catch {}
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
  useEffect(() => {
    initializeStates();
  }, [searchParams]);
  const popup = (
    <>
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
  const functionBar = (
    <Flex>
      <HStack mb={2}>
        <Button bgColor="red" color={"white"} onClick={onOpen}>
          <Icon as={AiOutlineStar} mr={2}></Icon> Write a Review
        </Button>
        <Button>
          <Icon as={BsBookmark} mr={2}></Icon> Save
        </Button>
      </HStack>
    </Flex>
  );

  const noComment = (
    <Container
      textAlign={["center", "center"]}
      fontStyle="italic"
      pb={"1rem"}
      mt={"1rem"}
      mb={"1rem"}
      ml={0}
      style={{ boxShadow: "0 30px 40px rgba(0,0,0,.1)" }}
    >
      This university has no reviews yet.
    </Container>
  );

  const sortedReviews = []
    .concat(reviews)
    .sort((a, b) => {
      if (searchParams.sortBy == "Newest First") {
        return new Date(b["reviewDateTime"]) > new Date(a["reviewDateTime"])
          ? 1
          : -1;
      } else {
        return new Date(b["reviewDateTime"]) > new Date(a["reviewDateTime"])
          ? -1
          : 1;
      }
    })
    .map((entry, index) => {
      return reviews.length >= 1 ? (
        <Review
          username={entry.username}
          comment={entry.comment}
          rating={entry.rating}
          dateTime={entry.reviewDateTime}
          key={index}
        ></Review>
      ) : (
        noComment
      );
    });
  return (
    <Box>
      <TitleBox name={school} reviews={10}></TitleBox>
      <Flex className="UniversityHome" justify={"space-around"}>
        {/* left column */}
        <Flex grow={2} justify="flex-start" direction={"column"}>
          {functionBar}
          {popup}
          <Box mb={"2rem"}></Box>
          <ReviewSearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          ></ReviewSearchBar>
          {/* {reviews.map((entry, index) => {
            return reviews.length >= 1 ? (
              <Review
                username={entry.username}
                comment={entry.comment}
                rating={entry.rating}
                dateTime={entry.reviewDateTime}
                key={index}
              ></Review>
            ) : (
              noComment
            );
          })} */}
          {sortedReviews}
        </Flex>
        {/* right column */}
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
    </Box>
  );
}

export default UniversityHome;
