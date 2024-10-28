import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

export const ContactUs: React.FC = () => {
  return (
    <Box className="site-section" id="section-contact" py={10} bg="gray.50">
      <Container maxW="container.xl">
        <Box textAlign="center" mb={10}>
          <Heading as="h2" size="xl" className="blutext" mb={3}>
            Contact Us
          </Heading>
          <Text color="blackAlpha.700" fontSize="lg">
            Ready to get in touch with LinkOrg Networks VOIP?
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <form action="#">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <FormControl id="fname" isRequired>
                  <FormLabel color="gray.800">First Name</FormLabel>
                  <Input type="text" placeholder="First Name" />
                </FormControl>
                <FormControl id="lname" isRequired>
                  <FormLabel color="gray.800">Last Name</FormLabel>
                  <Input type="text" placeholder="Last Name" />
                </FormControl>
              </SimpleGrid>

              <FormControl id="email" isRequired mt={5}>
                <FormLabel color="gray.800">Email</FormLabel>
                <Input type="email" placeholder="johndoe@gmail.com" />
              </FormControl>

              <FormControl id="subject" isRequired mt={5}>
                <FormLabel color="gray.800">Subject</FormLabel>
                <Input type="text" placeholder="Subject" />
              </FormControl>

              <FormControl id="message" isRequired mt={5}>
                <FormLabel color="gray.800">Message</FormLabel>
                <Textarea placeholder="Your message" rows={7} />
              </FormControl>

              <Button
                type="submit"
                colorScheme="orange"
                size="lg"
                mt={5}
                w="full"
                _hover={{ bg: "orange.600" }}
                _active={{ bg: "orange.700" }}
              >
                Send Message
              </Button>
            </form>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontWeight="bold" className="blutext" fontSize="lg" mb={3}>
              Address
            </Text>
            <Text color="gray.600" mb={4}>
              50 Sargent Gardens, NG32HU, Nottingham, UK
            </Text>

            <Text fontWeight="bold" className="blutext" fontSize="lg" mb={3}>
              Phone
            </Text>
            <Text color="gray.600" mb={4}>
              <a href="tel:442033998399">+44(0) 2033 998399</a>
            </Text>

            <Text fontWeight="bold" className="blutext" fontSize="lg" mb={3}>
              Email Address
            </Text>
            <Text color="gray.600" mb={4}>
              <a href="mailto:info@linkorgnet.com">info@linkorgnet.com</a>
            </Text>

            <Box mt={5}>
              <Text fontSize="lg" fontWeight="bold" mb={3} className="blutext">
                More Info
              </Text>
              <Text color="gray.600" mb={4}>
                At LinkOrg Networks, we specialize in providing cutting-edge VOIP solutions tailored to meet the needs of businesses in various sectors. Our services include reliable satellite communication, remote internet solutions, and comprehensive IT support. Our dedicated team is committed to ensuring seamless connectivity and efficient communication for all our clients.
              </Text>
              <Text color="gray.600" mb={4}>
                For further inquiries, feel free to reach out to us via the contact form above, or connect with us on social media for the latest updates and industry news. Your satisfaction is our priority, and we look forward to serving you!
              </Text>
              <Button colorScheme="orange" size="md" mt={4}>
                Learn More
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
