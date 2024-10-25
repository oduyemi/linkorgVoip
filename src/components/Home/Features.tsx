import { Box, Flex, Icon, Heading, SimpleGrid } from "@chakra-ui/react";
import { FaCheck, FaShippingFast, FaExchangeAlt, FaPhoneVolume } from "react-icons/fa";

const featuresData = [
  { icon: FaCheck, text: "Quality Product" },
  { icon: FaShippingFast, text: "Free Shipping" },
  { icon: FaExchangeAlt, text: "14-Day Return" },
  { icon: FaPhoneVolume, text: "24/7 Support" },
];

export const Features: React.FC = () => (
  <Box className="container-fluid" pt="5">
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} px={{ xl: 5 }} pb={3}>
      {featuresData.map((feature, index) => (
        <Box key={index} className="col" pb={1}>
          <Flex
            align="center"
            bg="gray.100"
            mb={4}
            p={7}
            rounded="md"
            boxShadow="sm"
            className="d-flex"
          >
            <Icon as={feature.icon} className="blutext" w={8} h={8} mr={3} />
            <Heading as="h5" fontSize="lg" fontWeight="semibold" m={0}>
              {feature.text}
            </Heading>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

