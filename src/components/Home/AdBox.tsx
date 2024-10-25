import React from 'react';
import { Container, Flex, Heading, Button, chakra, useBreakpointValue } from '@chakra-ui/react';
import { motion, Transition } from 'framer-motion';

// Create a motion-enabled component
const MotionBox = chakra(motion.div); // Wrap motion.div with chakra

interface AdBoxProps {
  backgroundImage: string;
}

export const AdBox: React.FC<AdBoxProps> = ({ backgroundImage }) => {
  // Responsive font size for the heading
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });

  // Define transitions with explicit type
  const fadeTransition: Transition = {
    duration: 0.5,
    ease: 'easeInOut',
  };

  const slideTransition: Transition = {
    duration: 0.5,
    ease: 'easeInOut',
  };

  const scaleTransition: Transition = {
    duration: 0.3,
    ease: 'easeInOut',
  };

  return (
    <MotionBox
      className="site-section overlay site-cover-2"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      position="relative"
      py={10}
      bgSize="cover"
      bgPos="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: fadeTransition.duration, ease: fadeTransition.ease }} // Adjusted to meet type expectations
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="center" flexDirection="column" textAlign="center">
          <MotionBox
            as={Heading}
            fontSize={headingFontSize}
            color="white"
            mb={4}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: slideTransition.duration, ease: slideTransition.ease }} // Adjusted to meet type expectations
          >
            LinkOrg VoIP provides reliable VoIP communication services, with our secure cloud-based PBX fully redundant, enabling you to make calls to anywhere in the world.
          </MotionBox>
          <MotionBox
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: scaleTransition.duration, ease: scaleTransition.ease }} // Adjusted to meet type expectations
          >
            <Button
              as="a"
              href="https://untree.co/"
              rel="noopener noreferrer"
              colorScheme="orange"
              variant="solid"
              size="lg"
              boxShadow="lg"
              _hover={{ bg: 'orange.600', transform: 'translateY(-2px)', boxShadow: 'xl' }}
              _active={{ bg: 'orange.700', transform: 'translateY(0)' }}
            >
              See Packages
            </Button>
          </MotionBox>
        </Flex>
      </Container>
    </MotionBox>
  );
};

