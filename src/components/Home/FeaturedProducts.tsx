import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../usercontext";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../Cart/CartContext";
import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  Stack,
  IconButton,
  Flex,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  brand: string;
  img: string;
  price: number;
  description: string;
  webName: string;
}

export const FeaturedProducts: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userIP, setUserIP] = useState<string | null>(null);
  const guestID = useRef<string>(uuidv4());
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const toast = useToast();

  // FETCH USER IP
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

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://linkorg-voip.vercel.app/api/v1/products"
        );
        if (Array.isArray(response.data.data)) {
          setProducts(getRandomProducts(response.data.data, 4));
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // RANDOM PRODUCTS
  const getRandomProducts = (products: Product[], count: number) => {
    const selected = new Set<number>();
    while (selected.size < Math.min(count, products.length)) {
      selected.add(Math.floor(Math.random() * products.length));
    }
    return Array.from(selected).map((index) => products[index]);
  };

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
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not add product to cart. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Heading as="h2" fontSize="2xl" textAlign="center" mb={6}>
          Featured Products
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height="300px" />
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="red.500" mt={4}>
        {error}
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h2" fontSize="2xl" className="blutext" textAlign="center" mb={6} color="teal.500">
        Featured Products
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {products.map((product) => (
          <Box
            key={product._id}
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={5}
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
          >
            <Box position="relative" overflow="hidden" borderRadius="lg">
              <Image
                src={product.img}
                alt={product.title}
                width="100%"
                height="200px"
                objectFit="contain"
                className="img-responsive mb-3"
                borderRadius="md"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.1)" }}
              />
              <Flex mt={2} justify="center">
                <IconButton
                  aria-label="Add to cart"
                  onClick={() => handleAddToCart(product)}
                  icon={<FaShoppingCart />}
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                />
                <IconButton
                  aria-label="Add to wishlist"
                  icon={<FaHeart />}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  ml={2}
                />
                <IconButton
                  aria-label="View details"
                  icon={<FaSearch />}
                  variant="outline"
                  colorScheme="gray"
                  size="sm"
                  ml={2}
                />
              </Flex>
            </Box>
            <Stack mt={4} spacing={2} align="center">
              <Text fontWeight="semibold" fontSize="lg" className="blutext" noOfLines={1}>
                {product.description}
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="gray">
                &#163;{product.price.toFixed(2)}
              </Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
