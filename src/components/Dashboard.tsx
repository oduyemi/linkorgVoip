import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../usercontext';
import { v4 as uuidv4 } from "uuid";
import { useCart } from './Cart/CartContext';
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
} from '@chakra-ui/react';
import { FaUserCircle, FaShoppingCart, FaHeart, FaCog, FaSignOutAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState<boolean>(false);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

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

  useEffect(() => {
    if (!user) {
      setFlashMessage({
        type: "error",
        message: "You need to login first!",
      });
      window.location.href = "/login";
    } else {
      setUserDetails({
        id: user._id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // FETCH USER IP
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP:", error);
        setUserIP("unknown");
      }
    };

    fetchIP();
  }, []);

  // ADD TO CART
  const handleAddToCart = async (product: Product) => {
    const cartKey = user ? `cart-${userDetails.id}` : `cart-${userIP || "guest"}`;
    const cartProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      img: product.img,
      quantity: 1,
    };

    try {
      if (user) {
        const response = await axios.post(
          "https://linkorg-voip.vercel.app/api/v1/cart/add",
          { userId: user._id, productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        toast({
          title: "Success!",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
        const updatedCart = [...currentCart, cartProduct];
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        toast({
          title: "Added to Cart",
          description: "Log in to sync with your account.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add product to cart. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Fetch product suggestions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://linkorg-voip.vercel.app/api/v1/products"
        );
        let products = response.data.data;
        products = products.sort(() => Math.random() - 0.5);
        setProductSuggestions(products.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Flex bg="gray.50" minH="100vh">
      {/* Sidebar */}
      <Box
        bg="#010156"
        color="white"
        w="200px"
        p={6}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        marginTop="-2.2%"
      >
        <VStack align="start" spacing={6}>
          <HStack spacing={4}>
            <Icon as={FaUserCircle} boxSize={8} />
            <Text fontSize="2xl" fontWeight="bold">
              {user?.firstName} {user?.lastName}
            </Text>
          </HStack>
          <Divider />
          <VStack align="start" spacing={4}>
            <Button leftIcon={<FaShoppingCart />} variant="ghost" colorScheme="whiteAlpha">
              My Cart
            </Button>
            <Button leftIcon={<FaHeart />} variant="ghost" colorScheme="whiteAlpha">
              Wishlist
            </Button>
            <Button leftIcon={<FaCog />} variant="ghost" colorScheme="whiteAlpha">
              Settings
            </Button>
          </VStack>
        </VStack>
        <Button
          leftIcon={<FaSignOutAlt />}
          colorScheme="red"
          variant="solid"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={8}>
        <Heading mb={6} color="teal.800">
          Welcome Back, {user?.firstName}!
        </Heading>

        {/* Product Suggestions */}
        <Box mb={8}>
          <Heading size="lg" mb={4}>
            Product Suggestions
          </Heading>
          {loading ? (
      <Spinner size="lg" color="teal.500" />
    ) : (
      <Slider {...sliderSettings}>
        {productSuggestions.map((item) => (
          <Box
            key={item._id}
            borderWidth={1}
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
            textAlign="center"
            _hover={{
              boxShadow: '2xl',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            }}
          >
            <Image
              src={`${item.img}`}
              alt={item.title}
              height="200px"
              borderRadius="md"
              objectFit="cover"
              mx="auto"
            />
            <Heading mt={4} fontSize="lg" fontWeight="semibold" className="blutext">
              {item.title}
            </Heading>
            <Text fontSize="sm" color="gray.700" mt={2}>
              £{item.price.toFixed(2)}
            </Text>
            <Button
              mt={4}
              colorScheme="teal"
              size="sm"
              onClick={() => handleAddToCart(item)}
              _hover={{ bg: 'teal.600' }}
            >
              Add to Cart
            </Button>
          </Box>
        ))}
      </Slider>
    )}
          </Box>
    {/* Purchased Items */}
    <Box bg="gray.100" p={6} borderRadius="lg" boxShadow="md" mt={8}>
      <Text fontSize="lg" fontWeight="semibold" color="teal.700" mb={4}>
        Purchased Items
      </Text>
      {purchasedItems.length > 0 ? (
        <SimpleGrid columns={gridColumns} spacing={2}>
          {purchasedItems.map((item) => (
            <Box
              key={item._id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg="white"
              boxShadow="lg"
              textAlign="center"
              _hover={{
                boxShadow: "2xl",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              }}
            >
              <Image
                src={`https://linkorg-voip.vercel.app/${item.img}`}
                alt={item.title}
                height="80px"
                borderRadius="md"
                objectFit="cover"
                mx="auto"
              />
              <Heading mt={4} fontSize="lg" fontWeight="semibold">
                {item.title}
              </Heading>
              <Text fontSize="sm" color="gray.700" mt={2}>
                £{item.price.toFixed(2)}
              </Text>
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




  );
};



