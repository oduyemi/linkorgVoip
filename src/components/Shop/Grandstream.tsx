import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  Badge,
  Stack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { GrandstreamProducts } from "./GrandstreamProducts";

export const Grandstream: React.FC = () => {
  return (
    <Box p={5}>
      <Flex flexWrap="wrap" gap={5}>
        {/* Shop Sidebar Start */}
        <Box w={{ base: "100%", md: "30%", lg: "25%" }}>
          {/* Price Filter */}
          <Heading as="h6" fontSize="lg" mb={3} textTransform="uppercase">
            <Box as="span" color="blue.600">Filter by price</Box>
          </Heading>
          <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
            <FormControl as="form">
              <Checkbox defaultChecked>
                All Price
                <Badge ml={2} fontWeight="normal" border="1px" borderColor="gray.300">
                  1000
                </Badge>
              </Checkbox>
              <Stack spacing={3} mt={3}>
                {["£0 - £100", "£100 - £200", "£200 - £300", "£300 - £400", "£400 - £500"].map((priceRange, index) => (
                  <Checkbox key={index}>
                    {priceRange}
                    <Badge ml={2} fontWeight="normal" border="1px" borderColor="gray.300">
                      {Math.floor(Math.random() * 300) + 100} {/* Random count placeholder */}
                    </Badge>
                  </Checkbox>
                ))}
              </Stack>
            </FormControl>
          </Box>

          {/* Brand Filter */}
          <Heading as="h6" fontSize="lg" mb={3} textTransform="uppercase">
            <Box as="span" color="blue.600">Filter by Brand</Box>
          </Heading>
          <Box bg="gray.50" p={4} borderRadius="md">
            <FormControl as="form">
              <Checkbox defaultChecked>
                All Brands
                <Badge ml={2} fontWeight="normal" border="1px" borderColor="gray.300">
                  1000
                </Badge>
              </Checkbox>
              <Stack spacing={3} mt={3}>
                {["Cisco", "Fanvil", "Grandstream", "Yealink"].map((brand, index) => (
                  <Checkbox key={index}>
                    {brand}
                    <Badge ml={2} fontWeight="normal" border="1px" borderColor="gray.300">
                      {Math.floor(Math.random() * 300) + 100} {/* Random count placeholder */}
                    </Badge>
                  </Checkbox>
                ))}
              </Stack>
            </FormControl>
          </Box>
        </Box>
        {/* Shop Sidebar End */}

        {/* Shop Product Start */}
        <Box flex="1">
          <GrandstreamProducts />
        </Box>
        {/* Shop Product End */}
      </Flex>
    </Box>
  );
};
