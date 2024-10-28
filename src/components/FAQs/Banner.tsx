import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import faqHero from "../../assets/images/faqHero.jpg";


export const FAQBanner: React.FC = () => {
  return (
    <Box
        id="section-home"
        bgImage={faqHero}
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
              VoIP Hardware from the best brands
            </Heading>
            <Text color="white" fontSize="xl" mb={5}>
            Best VoIP Hardware, Cloud based Business Voip phone system from Linkorg. Simple and easy to set up and cheap to run with over 40 features included.
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

