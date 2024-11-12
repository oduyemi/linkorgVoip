import React from "react";
import { Box, Heading, Text, Flex, VStack } from "@chakra-ui/react";

const faqData = [
  {
    question: "What is VOIP?",
    answer: "Voice over Internet Protocol is a convenient, affordable means for businesses and individuals to use the internet to conduct telephone calls, and represents a more cost-effective alternative to traditional PSTN.",
  },
  {
    question: "What is PBXware?",
    answer: "Incorporating a range of traditional telephony and modern VoIP technologies, PBXware is a scalable solution that enables enhanced management of business telecommunications. From routing and voicemail, to auto attendants and conferencing, PBXware can offer advanced features in a single package, saving you money on multiple systems.",
  },
  {
    question: "What is DID?",
    answer: "Direct Inward Dialling is a feature used with PBX systems and sees a telephone company allocate a range of numbers associated with one or more phone lines. DID enables businesses to assign a personal number to each employee, without requiring a separate phone line for each.",
  },
  {
    question: "What are SIP phones?",
    answer: "SIP phones are used for VoIP calls and are available in two types: hardphone (resembling a common telephone) and softphone (a computer software phone)",
  },
  {
    question: "What is Business SIP Truncking",
    answer: "Business SIP trunking is a service that enables your company to operate a selection of telecommunications systems over your IP network, and offers a number of benefits. From cheaper international call costs to improved business flexibility, a Disaster Recover strategy to give access to an increased quantity of numbers, business SIP trunking from Xinix World can enhance the way your business stays connected.",
  },
  {
    question: "How do I set up VoIP?",
    answer: "You need Broadband internet connection. The more call volume you have the higher the bandwidth you will need. We have low call volume and are using a 7Mbps/700Kbps connection, this has been plenty of bandwidth for us. Wired Ethernet router. You have a ton of options here but your budget will likely decide this one.",
  },
  {
    question: "How secure is VoIP?",
    answer: "Security for VoIP uses industry standard encryption technology such as SSL and VPN.",
  },
  {
    question: "Can I use VoIP with a regular(analogue) telephone?",
    answer: "To connect VoIP phones to traditional telephony networks, you need to install an Analog Telephone Adapter (ATA) which converts the analog signal into digital data.",
  },
  {
    question: "Does VoIP work on dial-up?",
    answer: "A dial-up connection can support VoIP, but it is recommended to use broadband since certain codecs require higher bandwidths for quality purposes.",
  },
  {
    question: "What are the benefits of using LinkOrg Networks' VoIP solutions over traditional phone lines?",
    answer: "Our VoIP solutions offer greater flexibility, lower costs, and advanced features like call forwarding, video conferencing, and multi-device integration. It’s an efficient alternative to traditional phone systems.",
  },
  {
    question: "Can your VoIP services be integrated with our existing IT infrastructure?",
    answer: "Yes, our VoIP solutions are designed to seamlessly integrate with your existing IT and network infrastructure, minimizing disruptions during deployment.",
  },
  {
    question: "How scalable are your VoIP systems for growing businesses?",
    answer: "Our VoIP systems are highly scalable, allowing you to easily add new users, extensions, and features as your business expands.",
  },
  {
    question: "Do you offer call encryption for secure voice communication?",
    answer: "Yes, all VoIP communications are encrypted end-to-end to ensure your voice communications remain private and secure from unauthorized access.",
  },
  {
    question: "Are your VoIP solutions suitable for remote workers or teams across multiple locations?",
    answer: "Yes, our VoIP solutions are perfect for remote teams and businesses with multiple locations. We provide seamless communication across all locations, no matter where your team is.",
  },
];

export const VoipQuestions: React.FC = () => {
  return (
    <Box>
      <Box className="faq-section section-padding" style={{ backgroundColor: "#F3F6FB" }}>
        <Box className="container">
          <Box className="about-wrapper">
            <Flex>
              <Box className="about-content" flex="1">
                <Box className="section-title">
                  <Text className="wow fadeInUp" style={{ textDecoration: "none" }}>
                    Frequently Asked Questions
                  </Text>
                  <Heading
                    as="h2"
                    className="wow fadeInUp blutext"
                    data-wow-delay=".3s"
                    fontSize="40px"
                    fontWeight={800}
                    color="#010156"
                  >
                    Have a question in <br />
                    your mind?
                  </Heading>
                </Box>
                <Text
                  className="mt-4 mt-md-0 wow fadeInUp"
                  data-wow-delay=".5s"
                  fontSize="16px"
                >
                  LinkOrg Networks is a premier provider of advanced satellite communication and IT solutions, dedicated to empowering industries and supporting global connectivity.
                  <br />
                  <br />
                  We deliver reliable, high-performance services tailored to meet the unique demands of businesses across various sectors.
                </Text>
              </Box>
            </Flex>
            <VStack spacing={4} mt={6}>
              {faqData.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                  bg="white"
                  transition="0.3s"
                  _hover={{ bg: "#E6F2FF", transform: "scale(1.02)" }} // Slight scaling on hover
                  width="100%"
                >
                  <Text fontWeight="bold" color="#010156">{item.question}</Text>
                  <Text color="gray.600">{item.answer}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
