import {
  Container,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup } from "@chakra-ui/react";
import RecommendationResult from "../../routes/RecommendationResult";

function RecommendationsForm(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [countryList, setCountryList] = useState(["USA", "Singapore"]);

  const [formData, setFormData] = useState({
    course: "Computer Science",
    country: "*",
    includeUser: "yes",
    education: 3,
    faculty: 3,
    research: 3,
  });

  useEffect(() => {
    console.log(formData);
    fetch("/countries")
      .then((res) => res.json())
      .then((d) => {
        setCountryList(d["data"]);
      });
  }, []);
  const getRecommendations = () => {
    console.log("submitting form: ", formData);
    fetch("/yourfuturecore", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      res.json().then((data) => {
        localStorage.setItem("recommendations", JSON.stringify(data["data"]));
      });
    });
  };
  const handleSubmit = () => {
    getRecommendations();
    navigate("/result");
  };

  const Form = (function () {
    switch (page) {
      case 1:
        return (
          <Container>
            <VStack spacing={3} alignItems="flex-start">
              <Heading size="2x1">Tell us what are you looking for.</Heading>
            </VStack>
            <VStack
              w="full"
              h="full"
              p={10}
              spacing={10}
              alignItems="flex-start"
              bg="gray.50"
              className="abc"
            >
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full ">
                {/* <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Study Level</FormLabel>
                  <Input placeholder="Bachelor"></Input>
                </GridItem> */}
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    placeholder="Physics"
                    onChange={(e) => {
                      setFormData({ ...formData, course: e.target.value });
                    }}
                  ></Input>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select>
                    {countryList.map((c, i) => {
                      return (
                        <option
                          key={i}
                          value=""
                          onClick={(e) => {
                            setFormData({
                              ...formData,
                              country: e.target.textContent,
                            });
                          }}
                        >
                          {c}
                        </option>
                      );
                    })}
                  </Select>
                </GridItem>
                <GridItem colSpan={1}>
                  <Button
                    size="lg"
                    w="full"
                    onClick={() => {
                      setPage(2);
                    }}
                  >
                    Continue
                  </Button>
                </GridItem>
              </SimpleGrid>
            </VStack>
          </Container>
        );
      case 2:
        return (
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            bg="gray.50"
          >
            <VStack spacing={3} alignItems="flex-start">
              <Heading size="2x1">
                YourFuture values our users' opinions when it comes to the
                quality of universities.{" "}
              </Heading>

              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full ">
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>
                    Would you like to take user reviews into consideration
                  </FormLabel>
                  <RadioGroup
                    value={1}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        includeUser: e.target.value,
                      });
                    }}
                  >
                    <Stack direction="column">
                      <Radio value="yes">Yes of cos</Radio>
                      <Radio value="no">Nah not really</Radio>
                    </Stack>
                  </RadioGroup>
                </GridItem>
                <GridItem colSpan={1}>
                  <Button
                    size="lg"
                    w="full"
                    onClick={() => {
                      setPage(3);
                    }}
                  >
                    Continue
                  </Button>
                </GridItem>
              </SimpleGrid>
            </VStack>
          </VStack>
        );
      case 3:
        return (
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            bg="gray.50"
          >
            <VStack spacing={3} alignItems="flex-start">
              <Heading size="2x1">
                Customise your search to fit your priorities.
              </Heading>
            </VStack>
            <VStack
              w="full"
              h="full"
              p={10}
              spacing={10}
              alignItems="flex-start"
              bg="gray.50"
              className="abc"
            >
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Quality of Education</FormLabel>
                  <Slider
                    defaultValue={3}
                    min={0}
                    max={5}
                    onChange={(val) => {
                      setFormData({
                        ...formData,
                        education: val,
                      });
                    }}
                  >
                    <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                      1
                    </SliderMark>
                    <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                      2
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
                      4
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Quality of Faculty</FormLabel>
                  <Slider
                    defaultValue={3}
                    min={0}
                    max={5}
                    onChange={(val) => {
                      setFormData({
                        ...formData,
                        faculty: val,
                      });
                    }}
                  >
                    <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                      1
                    </SliderMark>
                    <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                      2
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
                      4
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Resesarch Performance</FormLabel>
                  <Slider
                    defaultValue={3}
                    min={0}
                    max={5}
                    onChange={(val) => {
                      setFormData({
                        ...formData,
                        research: val,
                      });
                    }}
                  >
                    <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                      1
                    </SliderMark>
                    <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                      2
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                      3
                    </SliderMark>
                    <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
                      4
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={1}>
                  <Button
                    size="lg"
                    w="full"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </GridItem>
              </SimpleGrid>
            </VStack>
          </VStack>
        );
      case 4:
        return <h1>Coming Soon.</h1>;
    }
  })();
  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      bg="gray.50"
    >
      {Form}
    </VStack>
  );
}
export default RecommendationsForm;
