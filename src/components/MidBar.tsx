import { Box, Flex, FormControl, Input, InputGroup, InputRightElement, Text, Link, Heading, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const MidBar: React.FC = () => {
  return (
    <Flex
      bg="white"
      py={3}
      px={{ base: 4, xl: 5 }}
      display={{ base: "none", lg: "flex" }} 
    >
      {/* Logo Section */}
      <Box width="33.33%"> 
        <Link href="/" textDecoration="none">
          <img src={require("../assets/images/logo/logo_whitebg.png")} width="35%" alt="sitelogo" />
        </Link>
      </Box>

      {/* Search Bar */}
      <Box width="33.33%" textAlign="left">
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Search for products"
              bg="white"
              borderColor="gray.300"
              className="mt-4"
            />
            <InputRightElement
              pointerEvents="none"
              bg="transparent"
              color="primary.500"
            >
              <Icon as={FaSearch} className="mt-5" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>

      {/* Customer Service Info */}
      <Box width="33.33%" textAlign="right">
        <Text m={0} color="orange">Customer Service</Text>
        <Heading as="h5" size="sm" m={0}>
          +44(0) 2033 998399
        </Heading>
      </Box>
    </Flex>
  );
};
