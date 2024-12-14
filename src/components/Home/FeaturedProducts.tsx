import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { Box, Container, Grid, Heading, Image, Text, Stack, IconButton, Flex, HStack } from "@chakra-ui/react";
import { FaShoppingCart, FaHeart, FaSyncAlt, FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  brand: string;
  img: string;
  price: number;
  description: string;
  webname: string;
}

export const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://linkorg-voip.vercel.app/api/v1/products');
        console.log(response.data.data);
        if (Array.isArray(response.data.data)) {
          const randomProducts = getRandomProducts(response.data.data, 4);
          setProducts(randomProducts);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  // Function to get random products
  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      img: product.img,
    };
    addToCart(cartProduct);
  };

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
          <Box key={product._id} bg="gray.50" p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <Box position="relative" overflow="hidden">
              <Image src={product.img} alt={product.webname} borderRadius="sm" className="img-responsive" />
              <Flex position="relative" top="0.5" left="14">
              <IconButton 
                aria-label="Add to cart" 
                onClick={() => handleAddToCart(product)} 
                icon={<FaShoppingCart />} 
                variant="outline" 
                colorScheme="gray" 
                size="sm" 
                _hover={{ color: "black", borderColor: "black" }}
                _active={{ color: "#e65d0f", borderColor: "#e65d0f" }}
              />
              <IconButton 
                aria-label="Add to wishlist" 
                icon={<FaHeart />} 
                variant="outline" 
                colorScheme="red" 
                size="sm" 
                ml={2} 
                _hover={{ color: "black", borderColor: "black" }}
                _active={{ color: "#e65d0f", borderColor: "#e65d0f" }}
              />

              <IconButton 
                aria-label="View details" 
                icon={<FaSearch />} 
                variant="outline" 
                colorScheme="gray" 
                size="sm" 
                ml={2} 
                _hover={{ color: "black", borderColor: "black" }}
                _active={{ color: "#e65d0f", borderColor: "#e65d0f" }}
              />
              </Flex>
            </Box>
            <Stack mt={4} spacing={2} align="center">
              <Text fontWeight="semibold" noOfLines={1}>{product.description}</Text>
              <HStack>
                <Text fontSize="lg" fontWeight="bold">${product.price}</Text>
                <Text as="del" fontSize="sm" color="gray.500">${product.price}</Text>
              </HStack>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
