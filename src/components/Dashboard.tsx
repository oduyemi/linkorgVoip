import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../usercontext";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "./Cart/CartContext";
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  Spinner,
  SimpleGrid,
  Badge,
  Icon,
  useBreakpointValue,
  useToast,
  Divider,
  HStack,
  Center,
} from "@chakra-ui/react";
import {
  FaUserCircle,
  FaShoppingCart,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Sidebar} from "./Sidebar";


interface Product {
  _id: string;
  title: string;
  price: number;
  img: string;
  webName: string;
}

interface FlashMessage {
  type: string;
  message: string;
}


export const Dashboard: React.FC = () => {
  const { user, handleLogout } = useContext(UserContext);
  const [userIP, setUserIP] = useState<string | null>(null);
  const guestID = useRef<string>(uuidv4());
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://linkorg-voip.vercel.app/api/v1/products"
        );
        setProductSuggestions(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
    }
  };

  return (
    <Box>
      <Text mb={1} mr={4} fontWeight="light" fontSize="lg" className="blutext" textAlign="end">
        Welcome Back, {user?.firstName}!
      </Text>
      <Text mr={4} fontWeight="light" fontSize="lg" color="teal.600" textAlign="end">
        Your Subscription plan is Gold
      </Text>

      {/* Product Suggestions */}
      <Box mb={8}>
        {loading ? (
          <Center>
            <Spinner size="xl" color="orange" />
          </Center>
        ) : (
          <Slider {...sliderSettings}>
            {productSuggestions.map((item) => (
              <Box
                key={item._id}
                borderWidth={1}
                borderRadius="lg"
                p={2}
                bg="white"
                boxShadow="lg"
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="400px"
                _hover={{
                  boxShadow: "2xl",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.webName}
                  borderRadius="md"
                  objectFit="cover"
                  mx="auto"
                  mt="5"
                  height="220px"
                  width="19%"
                />
                <Heading mt={4} fontSize="lg" fontWeight="semibold" className="blutext">
                  {item.webName}
                </Heading>
                <Text fontSize="sm" color="gray.700" mt={2}>
                  £{item.price.toFixed(2)}
                </Text>
                <Button
                  mt={2}
                  colorScheme="orange"
                  size="sm"
                  onClick={() => handleAddToCart(item)}
                  _hover={{ bg: "teal.600", color: "white" }}
                >
                  Add to Cart
                </Button>
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      <Flex bg="gray.50" minH="50vh">
        {/* Sidebar */}
        <Sidebar onLogout={handleLogout} />
        <Box flex={1} p={2} ml={{ base: 0, md: "250px" }}>
          {/* Purchased Items */}
          <Box bg="gray.100" p={6} borderRadius="lg" boxShadow="md" mt={8}>
            <Text fontSize="lg" fontWeight="semibold" color="teal.700" mb={4}>
              Purchased Items
            </Text>

            {purchasedItems.length > 0 ? (
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={4}
              >
                {purchasedItems.map((item) => (
                  <Box
                    key={item._id}
                    bg="white"
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    boxShadow="sm"
                    _hover={{
                      boxShadow: "lg",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      borderRadius="md"
                      mb={4}
                      height="150px" 
                      width="100%" 
                      objectFit="cover" 
                    />
                    <Heading fontSize="md" color="teal.600" fontWeight="bold">
                      {item.title}
                    </Heading>
                    <Text color="gray.600" fontSize="sm" mt={2}>
                      £{item.price.toFixed(2)}
                    </Text>
                    <HStack mt={4} justify="space-between">
                      <Badge colorScheme="green">In Stock</Badge>
                      <Button size="sm" colorScheme="orange" onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text fontSize="sm" color="gray.500" textAlign="center">
                You haven’t purchased any items yet.
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};