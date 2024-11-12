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
  Spinner,
} from "@chakra-ui/react";
import {
  FaThLarge,
  FaBars,
  FaShoppingCart,
  FaHeart,
  FaSyncAlt,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

interface Product {
  id: string; // mongodb object ID
  title: string;
  brand: string;
  img: string;
}

export const CiscoProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const iconSize = useBreakpointValue({ base: "xs", md: "sm" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://linkorg-voip.vercel.app/api/v1/products/cisco");
        console.log(response.data.data);  
        setProducts(response.data.data);
        setLoading(false);  
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);  
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Flex>
          <IconButton aria-label="Grid view" icon={<FaThLarge />} variant="outline" size={iconSize} />
          <IconButton aria-label="List view" icon={<FaBars />} variant="outline" size={iconSize} ml={2} />
        </Flex>
        <Flex>
          <Button size={iconSize} variant="outline" mr={2}>Sorting</Button>
          <Button size={iconSize} variant="outline">Showing</Button>
        </Flex>
      </Flex>

      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {products.map((product) => (
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
              src={`https://linkorg-voip.vercel.app/${product.img}`}
              alt={product.title} 
              width="100%" 
              height="auto" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150";
              }} 
            />

            <Flex 
              position="absolute" 
              top="36%" 
              left="50%" 
              transform="translate(-50%, -50%)" 
              opacity={0} 
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }} 
              zIndex={1}
              gap={2}
            >
              <Tooltip label="Add to Cart" aria-label="Add to Cart">
                <IconButton aria-label="Add to Cart" icon={<FaShoppingCart />} variant="outline" size={iconSize} />
              </Tooltip>
              <Tooltip label="Add to Wishlist" aria-label="Add to Wishlist">
                <IconButton aria-label="Add to Wishlist" icon={<FaHeart />} variant="outline" colorScheme="red" size={iconSize} />
              </Tooltip>
              <Tooltip label="Compare" aria-label="Compare">
                <IconButton aria-label="Compare" icon={<FaSyncAlt />} variant="outline" size={iconSize} />
              </Tooltip>
              <Tooltip label="View Details" aria-label="View Details">
                <IconButton aria-label="View Details" icon={<FaSearch />} variant="outline" size={iconSize} />
              </Tooltip>
            </Flex>

            <Box textAlign="center" py={4}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="semibold" isTruncated>{product.title}</Text>
                <Text fontSize="md" color="gray.600">{product.brand}</Text>
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
