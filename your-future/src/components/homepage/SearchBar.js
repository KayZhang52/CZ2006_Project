import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  HStack,
  Container,
  Flex,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaFlagUsa, FaBookReader } from "react-icons/fa";
import { AiOutlineTrophy, AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";

export default function SearchBar({ schools }) {
  const [countries, setCountries] = useState(["USA", "Singapore"]);
  const [courses, setCourses] = useState(["Math", "Computer Sciece"]);
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data["data"]);
      });
    fetch("/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data["data"]);
      });
  }, []);

  const handleCourseChange = (e) => {};
  const handleSubmit = () => {
    fetch("/universities", {
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
  };
  return (
    <Container pb="3rem">
      <HStack mb={2}>
        <Popover>
          <PopoverTrigger>
            <Input defaultValue={""}></Input>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>testing</PopoverBody>
          </PopoverContent>
          <Button>
            <Icon as={AiOutlineSearch} mr={2}></Icon>Go!
          </Button>
        </Popover>
      </HStack>

      <HStack mb={2}>
        <Menu>
          <MenuButton as={Button} rightIcon={" "}>
            <Icon as={FaFlagUsa} mr={2}></Icon>
            Country
            <Icon as={MdArrowDropDown} ml={1}></Icon>
          </MenuButton>
          <MenuList maxH="25rem" overflowY={"scroll"}>
            {countries.map((country, index) => {
              return <MenuItem key={index}>{country}</MenuItem>;
            })}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={" "}>
            <Icon as={AiOutlineTrophy} mr={2}></Icon>
            Ranking
            <Icon as={MdArrowDropDown} ml={1}></Icon>
          </MenuButton>
          <MenuList>
            <MenuItem>Top 5</MenuItem>
            <MenuItem>Top 10</MenuItem>
            <MenuItem>Top 20</MenuItem>
            <MenuItem>Top 100</MenuItem>
            <MenuItem>Top 200</MenuItem>
          </MenuList>
        </Menu>

        {/* {courses.map((course, index) => {
              return <MenuItem key={index}>{course}</MenuItem>;
            })} */}

        <Flex direction="row">
          <Button borderTopRightRadius="0" borderBottomRightRadius="0" p="1rem">
            <Icon as={FaBookReader}></Icon>Courses
          </Button>
          <Input
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            onChange={handleCourseChange}
          ></Input>
        </Flex>
      </HStack>
    </Container>
  );
}
