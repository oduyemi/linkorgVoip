import React from 'react';
import { Box, Container, Flex, Heading, Text, Button, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = chakra(motion.div);
const MotionImage = chakra(motion.img);



export const Intro: React.FC = () => {
  const transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <>
      <Box className="features-lg" bg="gray.50" py={10}>
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between" flexDirection={{ base: 'column', lg: 'row' }}>

            <MotionBox
              className="section-stack order-lg-2 mb-4 mb-lg-0 position-relative"
              data-aos="fade-up"
              data-aos-delay="0"
              flex="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition as any} 
              position="relative"
            >
              <Flex className="image-stack" position="relative">
                <MotionImage
                  src={require("../../assets/images/voipIntro.jpg")}
                  alt="Bottom Image"
                  borderRadius="lg"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 } as any} 
                />
              </Flex>
            </MotionBox>

            <MotionBox
              className="section-title"
              flex="1"
              data-aos="fade-up"
              data-aos-delay="100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={transition as any} 
            >
              <Heading as="h2" fontWeight="bold" mb={4} className="heading blutext animate__animated animate__fadeIn animate__infinite my-fade-in">
                Welcome to Linkorg VoIP
              </Heading>
              <Text mb={4} fontSize="lg" color="gray.700">
                In today's fast-paced world, reliable communication is essential, especially for industries operating in remote locations. At LinkOrg Networks, we specialize in delivering cutting-edge Voice over Internet Protocol (VoIP) services designed specifically for ships, vessels, and offshore platforms. Our advanced VoIP solutions leverage a unique combination of LEO and GEO satellite technologies, fiber optics, and robust IP-PBX systems to ensure crystal-clear voice communication, even in the most challenging environments. With our expert team and tailored solutions, we empower your operations with seamless connectivity, enhancing safety and efficiency at sea. Discover how LinkOrg Networks can transform your communication needs today!
              </Text>
              <Button as="a" href="/about" colorScheme="orange" variant="solid" size="lg">
                Get to know us
              </Button>
            </MotionBox>

          </Flex>
        </Container>
      </Box>

      <Box className="features-lg" bg="white" py={10}>
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between" flexDirection={{ base: 'column', lg: 'row' }}>

            <MotionBox
              className="section-stack mb-4 mb-lg-0"
              data-aos="fade-up"
              data-aos-delay="0"
              flex="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition as any} 
            >
              <MotionImage
                src={require("../../assets/images/voipReq.jpg")}
                alt="VoIP Requirements"
                className="img-fluid"
                borderRadius="lg"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 } as any} 
              />
            </MotionBox>

            <MotionBox
              className="section-title"
              flex="1"
              data-aos="fade-up"
              data-aos-delay="100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={transition as any} 
            >
              <Heading as="h2" fontWeight="bold" className="blutext animate__animated animate__bounce animate__infinite" mb={4}>
                VoIP Requirements
              </Heading>
              <Text mb={4} fontSize="lg" color="gray.700">
                VoIP Account from Linkorg Voip. Available internet access (any reliable internet with no active block on VoIP is adequate). Phone – hard phone and/or soft phone app, which can be installed on Windows laptop/desktop, Android devices, or iPhones.
              </Text>
              <Button as="a" href="/about" colorScheme="orange" variant="solid" size="lg">
                See Packages
              </Button>
            </MotionBox>

          </Flex>
        </Container>
      </Box>
    </>
  );
};
