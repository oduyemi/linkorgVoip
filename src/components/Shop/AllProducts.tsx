import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  Image,
  VStack,
  Spinner
  } from "@chakra-ui/react";
import {
  FaThLarge,
  FaBars,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { useCart } from "../Cart/CartContext";

export interface Product {
  id: string; // MongoDB object ID
  title: string;
  brand: string;
  img: string;
  price: number;
  description: string;
}

export const brandUrls: { [key: string]: string } = {
  all: "https://linkorg-voip.vercel.app/api/v1/products",
  cisco: "https://linkorg-voip.vercel.app/api/v1/products/cisco",
  fanvil: "https://linkorg-voip.vercel.app/api/v1/products/fanvil",
  grandstream: "https://linkorg-voip.vercel.app/api/v1/products/grandstream",
  yealink: "https://linkorg-voip.vercel.app/api/v1/products/yealink",
};

interface AllProductsProps {
  priceRange: [number, number];
  products: Product[];
}

export const AllProducts: React.FC<AllProductsProps> = ({ priceRange, products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const iconSize = useBreakpointValue({ base: "xs", md: "sm" });

  const { addToCart } = useCart();

  const filterByPrice = () => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterByPrice();
  }, [priceRange, products]);

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    // addToCart(cartProduct);
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
            mb={4}
            position="relative"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={product.img}
              alt={product.title}
              width="100%"
              height="auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/300";
              }}
            />
            <VStack spacing={2} p={4} align="start">
              <Text fontSize="lg" fontWeight="bold" className="blutext">{product.title}</Text>
              <Text fontSize="sm" color="gray.500">{product.description}</Text>
              <Flex justify="space-between" w="100%">
                <Text fontWeight="bold" color="gray.700">&#163;{product.price}</Text>
                <Text fontSize="sm" color="gray.500">{product.brand}</Text>
              </Flex>
              <Button
                leftIcon={<FaShoppingCart />}
                onClick={() => handleAddToCart(product)}
                colorScheme="orange"
                variant="outline"
                mt={3}
              >
                Add to Cart
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
