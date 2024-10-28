import React from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
  // useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  // const headingSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  
  return (
    <Box className="site-footer" py={10} bg="gray.300">
        <Box width="100%">
          <Container maxW="container.xl">
            <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={8}>
              <GridItem>
                <VStack align="start" spacing={6}>
                  <Box>
                    <Heading size="md" fontWeight="bold" className='blutext'>
                      About
                    </Heading>
                    <Text>
                    VoIP services are tailored for industries requiring consistent, reliable connectivity and are backed by a dedicated team of engineers stationed in strategic locations in the UK.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md" fontWeight="bold">
                      Connect with us
                    </Heading>
                    <HStack spacing={4}>
                      <Link href="#" aria-label="Facebook" isExternal>
                        <Icon as={FaFacebookF} boxSize={6} _hover={{ color: 'orange.600' }} />
                      </Link>
                      <Link href="#" aria-label="Twitter" isExternal>
                        <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'orange.600' }} />
                      </Link>
                      <Link href="#" aria-label="Instagram" isExternal>
                        <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'orange.600' }} />
                      </Link>
                      <Link href="#" aria-label="Dribbble" isExternal>
                        <Icon as={FaDribbble} boxSize={6} _hover={{ color: 'orange.600' }} />
                      </Link>
                      <Link href="#" aria-label="LinkedIn" isExternal>
                        <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'orange.600' }} />
                      </Link>
                    </HStack>
                  </Box>
                </VStack>
              </GridItem>

              <GridItem>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                  <GridItem>
                    <Heading size="md" fontWeight="bold" className='blutext'>
                      Quick Links
                    </Heading>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "20%" }}>
                      <Link href="/" _hover={{ color: 'orange.600' }}>Home</Link>
                      <Link href="/about" _hover={{ color: 'orange.600' }}>About Us</Link>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "20%" }}>
                      <Link href="packages" _hover={{ color: 'orange.600' }}>Packages</Link>
                      <Link href="/contact" _hover={{ color: 'orange.600' }}>Contact</Link>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "-50%" }}>
                      <Link href="/shop" _hover={{ color: 'orange.600' }}>Shop</Link>
                      <Link href="#" _hover={{ color: 'orange.600' }}>Privacy Policy</Link>
                    </VStack>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>

            <Divider my={8} borderColor="gray.700" />

            <Flex justify="center" textAlign="center">
              <Text>
                Copyright &copy; {new Date().getFullYear()} LinkOrg Networks | All Rights Reserved.
              </Text>
            </Flex>
          </Container>
        </Box>
      </Box>
  );
};

