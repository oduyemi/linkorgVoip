import { Box, Container, Flex, Heading, SimpleGrid, Icon, Text, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiPhone, FiPhoneCall, FiGlobe, FiVolume2, FiMonitor, FiSettings } from "react-icons/fi";

const MotionBox = motion<BoxProps>(Box as any);

const benefitsData = [
  {
    icon: FiPhone,
    title: "Phone Extensions",
    description: "Phone extensions independent of locations (e.g. extension 101 can be in your head office, and extension 102 can be allocated to your softphone app on your mobile phone.)",
  },
  {
    icon: FiPhoneCall,
    title: "Free Calls",
    description: "FREE calls between extensions regardless of location.",
  },
  {
    icon: FiGlobe,
    title: "Cheap International Calls",
    description: "Each extension can make cheap international calls around the world.",
  },
  {
    icon: FiVolume2,
    title: "Crystal Clear Call Quality",
    description: "Crystal clear call quality",
  },
  {
    icon: FiMonitor,
    title: "Monitor Extensions",
    description: "Monitor your extensions and check calls online.",
  },
  {
    icon: FiSettings,
    title: "Over 16 Enhanced Features",
    description: "PLUS over 16 Enhanced features, including caller ID, remote access, and call forwarding, to name a few",
  },
];

export const Benefits: React.FC = () => (
  <Box className="site-section" py={10} bg="gray.50">
    <Container maxW="container.xl">
      <Box textAlign="center" mb={10}>
        <Heading as="h2" fontSize="3xl" fontWeight="bold" className="blutext">
          Benefits & Features
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {benefitsData.map((benefit, index) => (
          <MotionBox
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Flex
              direction="column"
              align="center"
              justify="space-between"
              bg="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ bg: "blue.50" }}
              border="1px solid"
              borderColor="gray.200"
              height="100%"
            >
              <Flex
                align="center"
                justify="center"
                className="blu"
                color="white"
                rounded="full"
                boxSize={12}
                mb={4}
              >
                <Icon as={benefit.icon} w={6} h={6} />
              </Flex>
              <Box textAlign="center">
                <Heading as="h3" fontSize="xl" mb={2} color="gray.800">
                  {benefit.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {benefit.description}
                </Text>
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

