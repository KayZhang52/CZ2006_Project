import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListItem, UnorderedList, Container } from "@chakra-ui/react";

function SchoolList() {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/universities")
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data["data"]);
      });
  }, []);
  return (
    <Container>
      <UnorderedList>
        {" "}
        {universities.map((school, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => {
                navigate("/schoolhome/".concat(school.institution));
              }}
            >
              {school.institution}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Container>
  );
}

export default SchoolList;
