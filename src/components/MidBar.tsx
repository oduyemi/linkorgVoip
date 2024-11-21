import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export const MidBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://linkorg-voip.vercel.app/api/v1/products?search=${searchQuery}`);
      setSearchResults(response.data.data); // Assuming the API response has a `data` field
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <Flex bg="white" py={3} px={{ base: 4, xl: 5 }} display={{ base: "flex", lg: "flex" }}>
      {/* Logo Section */}
      <Box width="33.33%" className="d-md-block d-none">
        <Link href="/" textDecoration="none">
          <img src={require("../assets/images/logo/logo_whitebg.png")} width="35%" alt="sitelogo" />
        </Link>
      </Box>

      {/* Search Bar */}
      <Box width="33.33%" className="shift" textAlign="left">
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Search for products"
              bg="white"
              borderColor="gray.300"
              className="mt-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <InputRightElement
              bg="transparent"
              color="primary.500"
              onClick={handleSearch}
              cursor="pointer"
            >
              <Icon as={FaSearch} className="mt-5" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>

      {/* Customer Service Info */}
      <Box width="33.33%" textAlign="right">
        <Text m={0} fontWeight="bold" color="orange.500">Contact</Text>
        <Heading as="h5" size="xs" m={0}>
          +44(0) 2033 998399
        </Heading>
        <Heading as="h5" size="xs" m={0}>
          info@linkorgnet.com
        </Heading>
      </Box>
    </Flex>
  );
};
