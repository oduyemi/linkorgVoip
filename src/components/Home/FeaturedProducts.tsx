import { Box, Container, Grid, Heading, Image, Text, Stack, IconButton, Flex, HStack } from "@chakra-ui/react";
import { FaShoppingCart, FaHeart, FaSyncAlt, FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import yealinkW76P from "../../assets/images/flyers/yealinkW76P.jpg";
import yealinkT48U from "../../assets/images/flyers/yealinkT48U.jpg";
import yealinkW73P from "../../assets/images/flyers/yealinkW73P.jpg";

export const FeaturedProducts: React.FC = () => {
  const products = [
    { id: 1, name: "Yealink-W76P", price: 123.00, image: yealinkW76P, rating: 5, reviews: 99 },
    { id: 2, name: "Yealink-T48U", price: 123.00, image: yealinkT48U, rating: 4.5, reviews: 99 },
    { id: 3, name: "Yealink-W73P", price: 123.00, image: yealinkW73P, rating: 4, reviews: 99 },
    { id: 4, name: "Yealink-W76P", price: 123.00, image: yealinkW76P, rating: 3.5, reviews: 99 },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h2" fontSize="2xl" textAlign="center" className="blutext" mb={6} borderBottom="2px" borderColor="gray.200" pb={2}>
        Featured Products
      </Heading>
      <Grid 
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} 
        gap={6}
      >
        {products.map((product) => (
          <Box key={product.id} bg="gray.50" p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <Box position="relative" overflow="hidden">
              <Image src={product.image} alt={product.name} borderRadius="lg" />
              <Flex position="relative" top="0" left="12">
                <IconButton aria-label="Add to cart" icon={<FaShoppingCart />} variant="outline" colorScheme="gray" size="sm" />
                <IconButton aria-label="Add to wishlist" icon={<FaHeart />} variant="outline" colorScheme="red" size="sm" ml={2} />
                <IconButton aria-label="Compare" icon={<FaSyncAlt />} variant="outline" colorScheme="gray" size="sm" ml={2} />
                <IconButton aria-label="View details" icon={<FaSearch />} variant="outline" colorScheme="gray" size="sm" ml={2} />
              </Flex>
            </Box>
            <Stack mt={4} spacing={2} align="center">
              <Text fontWeight="semibold" noOfLines={1}>{product.name}</Text>
              <HStack>
                <Text fontSize="lg" fontWeight="bold">${product.price}</Text>
                <Text as="del" fontSize="sm" color="gray.500">${product.price}</Text>
              </HStack>
              <Flex align="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Box key={i} color={i < Math.floor(product.rating) ? "yellow.400" : "gray.300"}>
                      {i < product.rating && i === Math.floor(product.rating) && product.rating % 1 !== 0 ? (
                        <FaStarHalfAlt />
                      ) : (
                        <FaStar />
                      )}
                    </Box>
                  ))}
                <Text ml={2} fontSize="sm">({product.reviews})</Text>
              </Flex>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
