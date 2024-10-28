import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import abtHero from "../../assets/images/abtHero.jpg";


export const AboutBanner: React.FC = () => {
  return (
    <Box
        id="section-home"
        bgImage={abtHero}
        bgSize="cover"
        bgPosition="center"
        bgAttachment="fixed"
        position="relative"
        _before={{
          content: `""`,
          bg: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
        py={20}
    >
        <Container maxW="container.md" centerContent>
          <Flex align="center" justify="center" direction="column" textAlign="center" zIndex={1}>
            <Heading as="h1" color="white" fontSize="4xl" textTransform="uppercase" fontWeight="bold" mb={3}>
              The leading VoIP solutions provider
            </Heading>
            <Text color="white" fontSize="xl" mb={5}>
              Get Phone systems, IP phones and VoIP Equipment for deployment of any kind of VoIP system.
            </Text>
            <Button
              as="a"
              href="/shop"
              colorScheme="orange"
              size="lg"
              py={3}
              px={5}
            >
              Shop Now
            </Button>
          </Flex>
        </Container>
    </Box>
  );
};

