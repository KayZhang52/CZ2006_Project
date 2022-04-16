import { Box, Text, VStack, Image, Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const dict = {
  "Harvard University": "harvard",
  "Massachusetts Institute of Technology": "mit",
  "Stanford University": "stanford",
  "University of Cambridge": "cambridge",
  "University of Oxford": "oxford",
  "University of Oxford": "oxford",
  "Columbia University": "columbia",
  "Princeton University": "princeton",
  "University of California, Berkeley": "berkeley",
  "University of Pennsylvania": "pennsylvania",
  "University of California, Los Angeles": "losangeles",
  "University of Chicago": "chicago",
  "California Institute of Technology": "cit",
  "Yale University": "yale",
  "Cornell University": "cornell",
  "Johns Hopkins University": "johnhopkins",
};

export default function (props) {
  const navigate = useNavigate();
  return (
    <Box
      className="university"
      w={"200px"}
      minW={"200px"}
      mb={20}
      style={{ borderRadius: "1rem" }}
    >
      <Image
        style={{ borderRadius: "1rem 1rem 0px 0px" }}
        src={
          process.env.PUBLIC_URL +
          "images/universityBadgeImg/" +
          (dict[props.name] == undefined
            ? "filler.jpg"
            : dict[props.name] + ".jpg")
        }
      ></Image>
      <VStack p="0px 5px ">
        <Text _hover={{ textDecoration: "underline" }} fontWeight="bold">
          <Link to={"/schoolhome/".concat(props.name)}>{props.name}</Link>
        </Text>
        <Text>{props.location}</Text>
        <Text>
          {"\u2605".repeat(props.rating)}
          {"\u2606".repeat(5 - props.rating)}
        </Text>
      </VStack>
      <HStack w={"100%"} justify={"flex-end"}>
        <Button
          onClick={() => {
            navigate("/schoolhome/".concat(props.name));
          }}
          style={{ borderRadius: "1rem" }}
        >
          See Details
        </Button>{" "}
      </HStack>
    </Box>
  );
}
