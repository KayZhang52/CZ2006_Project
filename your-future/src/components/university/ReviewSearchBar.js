import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Container,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function ReviewSearchBar({ searchParams, setSearchParams }) {
  const handleInputValueChange = (e) => {
    setSearchParams({
      ...searchParams,
      inputValue: e.target.value,
    });
  };
  const handleSortByChange = (e) => {
    setSearchParams({
      ...searchParams,
      sortBy: e.target.textContent,
    });
  };
  return (
    <Container>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSortByChange}>Newest First</MenuItem>
          <MenuItem onClick={handleSortByChange}>Oldest First</MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
}
