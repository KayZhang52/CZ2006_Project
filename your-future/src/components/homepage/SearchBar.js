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
import { Icon } from "@chakra-ui/react";
import { FaFlagUsa, FaBookReader } from "react-icons/fa";
import { AiOutlineTrophy, AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";

//searchBar should just return search params

export default function SearchBar({ searchParams, setSearchParams }) {
  const [countryList, setCountryList] = useState(["USA", "Singapore"]);
  const [courseList, setCourseList] = useState(["Math", "Computer Sciece"]);

  const [inputValue, setInputValue] = useState("*");
  const [country, setCountry] = useState("*");
  const [course, setCourse] = useState("*");
  useEffect(() => {
    fetch("/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountryList(data["data"]);
      });
    fetch("/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourseList(data["data"]);
      });
  }, []);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleCountryChange = (e) => {
    console.log("country changed");
    setCountry(e.target.textContent);
  };
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };
  const handleSubmit = (e) => {
    let newObj = {
      ...searchParams,
      inputValue: inputValue,
      country: country,
      course: course,
    };
    console.log("searchParams: ", newObj);
    setSearchParams(newObj);
  };
  return (
    <Container pb="3rem">
      <HStack mb={2}>
        <Input
          bg="white"
          defaultValue={""}
          onChange={handleInputValueChange}
        ></Input>

        <Button onClick={handleSubmit}>
          <Icon as={AiOutlineSearch} mr={2}></Icon>Go!
        </Button>
      </HStack>

      <HStack mb={2}>
        <Menu>
          <MenuButton as={Button} rightIcon={" "}>
            <Icon as={FaFlagUsa} mr={2}></Icon>
            Country
          </MenuButton>
          <MenuList maxH="25rem" overflowY={"scroll"}>
            {countryList.map((country, index) => {
              return (
                <MenuItem key={index} onClick={handleCountryChange}>
                  {country}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>

        <Flex direction="row">
          <Button
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            pl="2rem"
            pr="2rem"
            leftIcon={<FaBookReader />}
            _hover={{ cursor: "default" }}
            _click={{}}
            _focus={{}}
          >
            Course
          </Button>
          <Input
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            onChange={handleCourseChange}
            background="white"
          ></Input>
        </Flex>
      </HStack>
    </Container>
  );
}
