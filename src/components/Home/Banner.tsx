import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  chakra
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import homeHero0 from "../../assets/images/homeHero0.jpg";
import homeHero1 from "../../assets/images/homeHero1.jpg";
import homeHero2 from "../../assets/images/homeHero2.jpg";
import yealinkW76P from "../../assets/images/flyers/yealinkW76P.jpg";
import yealinkT48U from "../../assets/images/flyers/yealinkT48U.jpg";

// Carousel Data
const carouselItems = [
  {
    imgSrc: homeHero0,
    title: 'Cloud Based Phone System',
    description: 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
  },
  {
    imgSrc: homeHero1,
    title: 'Get a Landline Number for Your Business',
    description: 'If you are a business in London, Oxford, Nottingham, Edinburgh or any other city in the UK. And you require a landline number for your business, contact us, and we will provision a number within 24 hours.',
  },
  {
    imgSrc: homeHero2,
    title: 'Inbound Call Handling',
    description: 'Secure cloud-based call center solution for efficient communication. Request a demo today. Enhance your call center operations with our VoIP products.',
  },
];

// Motion component for animations
const MotionBox = chakra(motion.div);
const MotionImage = chakra(motion.img);

export const Banner: React.FC = () => {
  const settings = {
    dots: false,
    loop: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <Box className="container-fluid mb-3">
      <Flex px={{ base: 4, xl: 5 }} flexDirection={{ base: 'column', lg: 'row' }}>
        {/* Carousel Section */}
        <Box className="col-lg-8">
          <Slider {...settings} className="header-carousel">
            {carouselItems.map((item, index) => (
              <MotionBox
                key={index}
                position="relative"
                height="430px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={transition as any} 
              >
                <MotionImage
                  src={item.imgSrc}
                  alt={item.title}
                  position="absolute"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={transition as any} 
                />
                <Flex
                  className="carousel-caption"
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  p={4}
                  color="white"
                  zIndex={1}
                  textAlign="center"
                >
                  <VStack spacing={4} maxWidth="700px">
                    <Heading as="h1" size="2xl" mb={3} className="text-light">
                      {item.title}
                    </Heading>
                    <Text>{item.description}</Text>
                    <Link href="/shop">
                      <Button colorScheme="orange" variant="outline" mt={3}>
                        Shop Now
                      </Button>
                    </Link>
                  </VStack>
                </Flex>
              </MotionBox>
            ))}
          </Slider>
        </Box>

        {/* Offer Section */}
        <Box className="col-lg-4">
          {[yealinkW76P, yealinkT48U].map((offerImg, index) => (
            <MotionBox
              key={index}
              mb={6}
              position="relative"
              height="200px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 } as any} 
            >
              <Image src={offerImg} alt={`Offer ${index + 1}`} width="65%" height="100%" objectFit="cover" />
              <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(0, 0, 0, 0.5)"
                p={4}
              >
                <Text fontSize="sm" color="white" textTransform="uppercase">Save 20%</Text>
                <Heading as="h3" size="lg" color="white" mb={3}>Special Offer</Heading>
                <Link href="/shop"><Button colorScheme="orange">Shop Now</Button></Link>
              </Flex>
            </MotionBox>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};
