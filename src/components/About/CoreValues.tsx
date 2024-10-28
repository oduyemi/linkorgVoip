import { Box, Container, Flex, Heading, Text, List, ListItem, HStack } from "@chakra-ui/react";
import React from "react";
import cValueImg from "../../assets/images/cValueImg.jpg";

interface CoreValueProps {
  number: number;
  title: string;
  description: string;
  items: string[];
}

const coreValuesData: CoreValueProps[] = [
  {
    number: 1,
    title: "Integrity & Honesty",
    description:
      "We are committed to maintaining the highest standards of integrity and honesty in all our operations. This builds trust with our clients, partners, and employees, ensuring long-term relationships and a solid reputation in the market.",
    items: [
      "Transparent business practices",
      "Accountability to clients and partners",
      "Ethical decision-making in all operations",
    ],
  },
  {
    number: 2,
    title: "Customer Satisfaction",
    description:
      "Our customers are important to us, so we strive to understand their needs and exceed their expectations through exceptional service and support. This approach not only enhances customer satisfaction but also drives repeat business and referrals.",
    items: [
      "24/7 customer support",
      "Personalized client consultations",
      "Proactive issue resolution",
    ],
  },
  {
    number: 3,
    title: "Continuous Learning & Development",
    description:
      "In the fast-paced IT industry, staying updated with the latest technologies and trends is essential. We provide opportunities for our employees to grow their skills and knowledge, ensuring that our team remains competent and motivated.",
    items: [
      "Access to training and certifications",
      "Regular workshops and seminars",
      "Encouragement of knowledge sharing",
    ],
  },
];

export const CoreValues: React.FC = () => {
  return (
    <Box
      id="section-c-value"
      bgImage={cValueImg}
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
      position="relative"
      py={20}
      color="white"
    >
      <Box
        bg="rgba(0, 0, 0, 0.5)"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
      />
      <Container maxW="container.lg" zIndex={1} position="relative">
        <Flex justify="center" mb={10} textAlign="center">
          <Heading as="h2" size="xl" className="white" fontWeight="light">
            Our Core Values
          </Heading>
        </Flex>
        <Flex direction={{ base: "column", md: "row" }} wrap="wrap" justify="space-around">
          {coreValuesData.map((value) => (
            <Box
              key={value.number}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="md"
              p={8}
              mb={8}
              flex="1"
              maxW={{ base: "100%", md: "30%" }}
              mr={{ md: 4 }}
            >
              <HStack justify="center" mb={4}>
                <Text fontSize="2xl" fontWeight="bold">
                  {value.number}
                </Text>
              </HStack>
              <Heading as="h3" size="md" mb={4}>
                {value.title}
              </Heading>
              <Text mb={6}>{value.description}</Text>
              <List spacing={3}>
                {value.items.map((item, index) => (
                  <ListItem key={index} color="whiteAlpha.800">
                    • {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

