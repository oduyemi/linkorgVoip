import { Box, Container, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react";
import React from "react";
import abt from "../../assets/images/abt.jpg";


export const AboutIntro: React.FC = () => {
    return(
        <Box id="section-about" py={20}>
        <Container maxW="container.lg">
          <Flex direction={{ base: "column", md: "row" }} mb={10}>
            <Box
              flex="1"
              order={{ base: 2, md: 1 }}
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
            >
              <Box borderBottom="2px solid" borderColor="purple.800" mb={4} pb={2}>
                <Heading as="h2" className="blutext animate__animated animate__fadeIn animate__infinite my-fade-in" size="lg">
                  About Us
                </Heading>
              </Box>
              <Text mb={5}>
                At LinkOrg Networks, we are dedicated to providing 
                innovative VoIP solutions tailored for the maritime 
                and offshore industries. Based in the UK, our expert 
                team combines years of experience with advanced 
                technology to deliver reliable and cost-effective 
                voice communication services. Utilizing cutting-edge 
                LEO and GEO satellite technologies, as well as robust 
                IP-PBX systems, we ensure that our clients—ranging 
                from vessels to offshore platforms—enjoy seamless 
                connectivity, even in the most remote locations.
              </Text>
              <Text mb={5}>
              Since our founding in 2009, we have focused on 
              enhancing communication safety and efficiency for our 
              clients. Our commitment to excellence is reflected in our 
              comprehensive support and bespoke solutions, ensuring your 
              operations remain connected and productive. Discover the 
              difference with LinkOrg Networks—where reliable 
              communication meets unparalleled expertise.
              </Text>
              <VStack align="start" spacing={2} mb={5}>
                <Text>✔ Reliable Communication: Ensure seamless voice connectivity even in the most remote maritime environments.</Text>
                <Text>✔ Advanced Technology: Leverage cutting-edge LEO and GEO satellite systems for superior call quality.</Text>
                <Text>✔ Expert Team**: Benefit from our years of industry experience and dedicated support for your VoIP needs.</Text>
                <Text>✔ Tailored Solutions: Get customized VoIP services designed specifically for the maritime and offshore industries.</Text>
                <Text>✔ Cost-Effective Services: Achieve operational efficiency with our competitive pricing and reliable services.</Text>
              </VStack>
            </Box>
            <Box flex="1" order={{ base: 1, md: 2 }} mb={{ base: 5, md: 0 }} pl={{ md: 8 }}>
              <Image
                src={abt}
                alt="About us"
                rounded="md"
                boxShadow="lg"
                data-aos="fade-up"
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    )
}