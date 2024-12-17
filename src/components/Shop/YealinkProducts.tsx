import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../usercontext";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../Cart/CartContext";import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useBreakpointValue,
  Image,
  VStack,
  Spinner,
  useToast
  } from "@chakra-ui/react";
import {
  FaShoppingCart,
} from "react-icons/fa";
import { Product } from "./AllProducts";
import axios from "axios";

interface YealinkProductsProps {
  priceRange: [number, number];
  products: Product[];
}

export const YealinkProducts: React.FC<YealinkProductsProps> = ({ priceRange, products }) => {
  const { user } = useContext(UserContext);
  const [userIP, setUserIP] = useState<string | null>(null);
  const guestID = useRef<string>(uuidv4());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const iconSize = useBreakpointValue({ base: "xs", md: "sm" });
  const { addToCart } = useCart();
  const toast = useToast();

  // Fetch user IP
    useEffect(() => {
      const fetchIP = async () => {
        try {
          const response = await fetch("https://api64.ipify.org?format=json");
          const data = await response.json();
          setUserIP(data.ip);
        } catch (err) {
          console.error("Failed to fetch IP:", err);
          setUserIP("unknown");
        }
      };
  
      fetchIP();
    }, []);

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

  const handleAddToCart = async (product: Product) => {
    const cartKey = user ? `cart-${user._id}` : `cart-${userIP || "guest"}`;
    const cartProduct = {
      id: product._id,
      title: product.webName,
      price: product.price,
      img: product.img,
      quantity: 1,
    };
  
    try {
      if (user?.token) {
        // User is logged in
        const response = await axios.post(
          "https://linkorg-voip.vercel.app/api/v1/cart/add",
          {
            userId: user._id,
            productId: product._id,
            quantity: 1,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
  
        if (response.status === 200) {
          toast({
            title: "Success!",
            description: response.data.message || "Product added to cart successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw new Error("Unexpected API response");
        }
      } else {
        // User not logged in, use local storage
        const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
        const existingIndex = currentCart.findIndex(
          (item: Product) => item._id === product._id
        );
  
        if (existingIndex > -1) {
          currentCart[existingIndex].quantity += 1;
        } else {
          currentCart.push(cartProduct);
        }
  
        localStorage.setItem(cartKey, JSON.stringify(currentCart));
        toast({
          title: "Added to Cart",
          description: "Log in to sync your cart with your account.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error:any) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not add product to cart. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  };
}
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
            key={product._id}
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
              <Text fontSize="lg" fontWeight="bold" className="blutext">{product.webName}</Text>
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
