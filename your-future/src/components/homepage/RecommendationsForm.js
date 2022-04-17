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
  const [results, setResults] = useState([
    {
      EmploymentScore: 1,
      FacultyScore: 1,
      Institution: "Harvard University",
      Location: "USA",
      QualityOfEducationScore: 0.5,
      ResearchScore: 1,
      Score: 100,
      WorldRanking: 1,
      WorldRankingScore: 1,
      newScore: 7.5,
    },
    {
      EmploymentScore: 0.1,
      FacultyScore: 0.2,
      Institution: "Massachusetts Institute of Technology",
      Location: "USA",
      QualityOfEducationScore: 1,
      ResearchScore: 0.2,
      Score: 96.7,
      WorldRanking: 2,
      WorldRankingScore: 0.5,
      newScore: 4.2,
    },
    {
      EmploymentScore: 0.333333333,
      FacultyScore: 0.5,
      Institution: "Stanford University",
      Location: "USA",
      QualityOfEducationScore: 0.111111111,
      ResearchScore: 0.5,
      Score: 95.2,
      WorldRanking: 3,
      WorldRankingScore: 0.333333333,
      newScore: 3.333333333,
    },
    {
      EmploymentScore: 0.052631579,
      FacultyScore: 0.083333333,
      Institution: "University of Cambridge",
      Location: "United Kingdom",
      QualityOfEducationScore: 0.25,
      ResearchScore: 0.090909091,
      Score: 94.1,
      WorldRanking: 4,
      WorldRankingScore: 0.25,
      newScore: 1.272727272,
    },
    {
      EmploymentScore: 0.041666667,
      FacultyScore: 0.25,
      Institution: "University of Oxford",
      Location: "United Kingdom",
      QualityOfEducationScore: 0.1,
      ResearchScore: 0.25,
      Score: 93.3,
      WorldRanking: 5,
      WorldRankingScore: 0.2,
      newScore: 1.8,
    },
    {
      EmploymentScore: 0.083333333,
      FacultyScore: 0.071428571,
      Institution: "Columbia University",
      Location: "USA",
      QualityOfEducationScore: 0.076923077,
      ResearchScore: 0.083333333,
      Score: 92.6,
      WorldRanking: 6,
      WorldRankingScore: 0.166666667,
      newScore: 0.6950549429999999,
    },
    {
      EmploymentScore: 0.071428571,
      FacultyScore: 0.016666667,
      Institution: "Princeton University",
      Location: "USA",
      QualityOfEducationScore: 0.166666667,
      ResearchScore: 0.018518519,
      Score: 92,
      WorldRanking: 7,
      WorldRankingScore: 0.142857143,
      newScore: 0.605555559,
    },
    {
      EmploymentScore: 0.019230769,
      FacultyScore: 0.166666667,
      Institution: "University of California, Berkeley",
      Location: "USA",
      QualityOfEducationScore: 0.2,
      ResearchScore: 0.166666667,
      Score: 91.6,
      WorldRanking: 8,
      WorldRankingScore: 0.125,
      newScore: 1.6000000020000003,
    },
    {
      EmploymentScore: 0.125,
      FacultyScore: 0.0625,
      Institution: "University of Pennsylvania",
      Location: "USA",
      QualityOfEducationScore: 0.066666667,
      ResearchScore: 0.071428571,
      Score: 91.1,
      WorldRanking: 9,
      WorldRankingScore: 0.111111111,
      newScore: 0.601785714,
    },
    {
      EmploymentScore: 0.055555556,
      FacultyScore: 0.058823529,
      Institution: "University of Chicago",
      Location: "USA",
      QualityOfEducationScore: 0.090909091,
      ResearchScore: 0.0625,
      Score: 90.7,
      WorldRanking: 10,
      WorldRankingScore: 0.1,
      newScore: 0.63669786,
    },
    {
      EmploymentScore: 0.006896552,
      FacultyScore: 0.017241379,
      Institution: "California Institute of Technology",
      Location: "USA",
      QualityOfEducationScore: 0.333333333,
      ResearchScore: 0.019230769,
      Score: 90.4,
      WorldRanking: 11,
      WorldRankingScore: 0.090909091,
      newScore: 1.109416443,
    },
    {
      EmploymentScore: 0.03030303,
      FacultyScore: 0.052631579,
      Institution: "Yale University",
      Location: "USA",
      QualityOfEducationScore: 0.125,
      ResearchScore: 0.058823529,
      Score: 90.1,
      WorldRanking: 12,
      WorldRankingScore: 0.083333333,
      newScore: 0.709365324,
    },
    {
      EmploymentScore: 0.038461538,
      FacultyScore: 0.041666667,
      Institution: "Cornell University",
      Location: "USA",
      QualityOfEducationScore: 0.083333333,
      ResearchScore: 0.045454545,
      Score: 89.5,
      WorldRanking: 14,
      WorldRankingScore: 0.071428571,
      newScore: 0.5113636349999999,
    },
    {
      EmploymentScore: 0.016666667,
      FacultyScore: 0.090909091,
      Institution: "University of California, Los Angeles",
      Location: "USA",
      QualityOfEducationScore: 0.032258065,
      ResearchScore: 0.1,
      Score: 89,
      WorldRanking: 16,
      WorldRankingScore: 0.0625,
      newScore: 0.669501468,
    },
    {
      EmploymentScore: 0.00729927,
      FacultyScore: 0.125,
      Institution: "Johns Hopkins University",
      Location: "USA",
      QualityOfEducationScore: 0.033333333,
      ResearchScore: 0.142857143,
      Score: 88.6,
      WorldRanking: 18,
      WorldRankingScore: 0.055555556,
      newScore: 0.903571428,
    },
    {
      EmploymentScore: 0.015151515,
      FacultyScore: 0.027777778,
      Institution: "Peking University",
      Location: "China",
      QualityOfEducationScore: 0.002840909,
      ResearchScore: 0.03030303,
      Score: 84,
      WorldRanking: 59,
      WorldRankingScore: 0.016949153,
      newScore: 0.182765151,
    },
    {
      EmploymentScore: 0.010752688,
      FacultyScore: 0.024390244,
      Institution: "Tsinghua University",
      Location: "China",
      QualityOfEducationScore: 0.002358491,
      ResearchScore: 0.027027027,
      Score: 83.3,
      WorldRanking: 70,
      WorldRankingScore: 0.014285714,
      newScore: 0.161327286,
    },
    {
      EmploymentScore: 0.004048583,
      FacultyScore: 0.010989011,
      Institution: "Technical University of Munich",
      Location: "Germany",
      QualityOfEducationScore: 0.023255814,
      ResearchScore: 0.012048193,
      Score: 82.9,
      WorldRanking: 76,
      WorldRankingScore: 0.013157895,
      newScore: 0.138879054,
    },
    {
      EmploymentScore: 0.007575758,
      FacultyScore: 0.022222222,
      Institution: "National University of Singapore",
      Location: "Singapore",
      QualityOfEducationScore: 0.013333333,
      ResearchScore: 0.025,
      Score: 82.5,
      WorldRanking: 85,
      WorldRankingScore: 0.011764706,
      newScore: 0.181666665,
    },
    {
      EmploymentScore: 0.00952381,
      FacultyScore: 0.012048193,
      Institution: "University of New South Wales",
      Location: "Australia",
      QualityOfEducationScore: 0.001945525,
      ResearchScore: 0.013157895,
      Score: 81.3,
      WorldRanking: 113,
      WorldRankingScore: 0.008849558,
      newScore: 0.081454839,
    },
    {
      EmploymentScore: 0.005747126,
      FacultyScore: 0.012987013,
      Institution: "Shanghai Jiao Tong University",
      Location: "China",
      QualityOfEducationScore: 0.009345794,
      ResearchScore: 0.014492754,
      Score: 81,
      WorldRanking: 119,
      WorldRankingScore: 0.008403361,
      newScore: 0.110476683,
    },
    {
      EmploymentScore: 0.002617801,
      FacultyScore: 0.014084507,
      Institution: "Zhejiang University",
      Location: "China",
      QualityOfEducationScore: 0.009174312,
      ResearchScore: 0.015873016,
      Score: 81,
      WorldRanking: 121,
      WorldRankingScore: 0.008264463,
      newScore: 0.117395505,
    },
    {
      EmploymentScore: 0.001096491,
      FacultyScore: 0.013333333,
      Institution: "Nanyang Technological University",
      Location: "Singapore",
      QualityOfEducationScore: 0.00877193,
      ResearchScore: 0.014925373,
      Score: 80.6,
      WorldRanking: 130,
      WorldRankingScore: 0.007692308,
      newScore: 0.111091908,
    },
    {
      EmploymentScore: 0.005813953,
      FacultyScore: 0.004608295,
      Institution: "University of Waterloo",
      Location: "Canada",
      QualityOfEducationScore: 0.006451613,
      ResearchScore: 0.005,
      Score: 79.2,
      WorldRanking: 179,
      WorldRankingScore: 0.005586592,
      newScore: 0.048179724,
    },
    {
      EmploymentScore: 0.003278689,
      FacultyScore: 0.00462963,
      Institution: "Delft University of Technology",
      Location: "Netherlands",
      QualityOfEducationScore: 0.003831418,
      ResearchScore: 0.005025126,
      Score: 77.9,
      WorldRanking: 236,
      WorldRankingScore: 0.004237288,
      newScore: 0.040458522000000004,
    },
    {
      EmploymentScore: 0.003584229,
      FacultyScore: 0.004347826,
      Institution: "Wuhan University",
      Location: "China",
      QualityOfEducationScore: 0.004444444,
      ResearchScore: 0.004739336,
      Score: 77.7,
      WorldRanking: 245,
      WorldRankingScore: 0.004081633,
      newScore: 0.040594818000000005,
    },
    {
      EmploymentScore: 0.001072961,
      FacultyScore: 0.003533569,
      Institution: "King Abdulaziz University",
      Location: "Saudi Arabia",
      QualityOfEducationScore: 0.003558719,
      ResearchScore: 0.003831418,
      Score: 76.8,
      WorldRanking: 300,
      WorldRankingScore: 0.003333333,
      newScore: 0.032771118,
    },
    {
      EmploymentScore: 0.003484321,
      FacultyScore: 0.002222222,
      Institution: "University of Malaya",
      Location: "Malaysia",
      QualityOfEducationScore: 0.002096436,
      ResearchScore: 0.00228833,
      Score: 74.8,
      WorldRanking: 442,
      WorldRankingScore: 0.002262443,
      newScore: 0.019820964,
    },
    {
      EmploymentScore: 0.001146789,
      FacultyScore: 0.002212389,
      Institution: "University of Technology Sydney",
      Location: "Australia",
      QualityOfEducationScore: 0.001960784,
      ResearchScore: 0.002262443,
      Score: 74.6,
      WorldRanking: 463,
      WorldRankingScore: 0.002159827,
      newScore: 0.019306848,
    },
  ]);
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
    fetch("/countries")
      .then((res) => res.json())
      .then((d) => {
        setCountryList(d["data"]);
      });
  }, [results]);
  const getRecommendations = () => {
    fetch("/yourfuturecore", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      res.json().then((data) => {
        console.log("recommendation results: ", data["data"]);
        // setResults(data["data"]);
      });
    });
  };
  const handleSubmit = () => {
    console.log("submitting form: ", formData);
    getRecommendations();
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
                    placeholder="Computer Science"
                    onChange={(e) => {
                      setFormData({ ...formData, course: e.target.value });
                    }}
                  ></Input>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl></FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onChange={(e) => {
                      console.log("x");
                      setFormData({
                        ...formData,
                        country: e.target.value,
                      });
                    }}
                  >
                    <option
                      value="*"
                      onClick={(e) => {
                        setFormData({
                          ...formData,
                          country: e.target.textContent,
                        });
                      }}
                    >
                      *
                    </option>
                    {countryList.map((c, i) => {
                      return (
                        <option
                          key={i}
                          value={c}
                          onClick={(e) => {
                            console.log("x");
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
                      setPage(4);
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
        return <RecommendationResult results={results}></RecommendationResult>;
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
