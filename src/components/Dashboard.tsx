import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../usercontext';
import { v4 as uuidv4 } from "uuid";
import { useCart } from './Cart/CartContext';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Spinner,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import Slider from 'react-slick'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 


interface Product {
  _id: string;
  title: string;
  price: number;
  img: string;
  webName: string
}

interface FlashMessage {
  type: string;
  message: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
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
    phone: ""
  })

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
      quantity: 1 
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
          isClosable: true 
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
          isClosable: true 
        });
      }
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Could not add product to cart. Please try again.", 
        status: "error", 
        duration: 3000, 
        isClosable: true 
      });
    }
  };
  

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  

  // Fetch product suggestions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://linkorg-voip.vercel.app/api/v1/products'); 
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

  const fetchWishlist = async () => {
    setLoadingWishlist(true);
    try {
      const response = await axios.get(`https://linkorg-voip.vercel.app/api/v1/wishlist/${user._id}`);
      const wishlist = response.data.items.map((item: any) => ({
        ...item.product,
      }));
      setWishlistItems(wishlist);
      setLoadingWishlist(false);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await axios.post('https://linkorg-voip.vercel.app/api/v1/wishlist/add', {
        userId: user._id,
        productId,
      });
      toast({
        title: 'Success!',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchWishlist(); // Refresh wishlist
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      toast({
        title: 'Error!',
        description: 'Unable to add product to wishlist. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await axios.delete(
        `https://linkorg-voip.vercel.app/api/v1/wishlist/${user._id}/${productId}`
      );
      toast({
        title: 'Success!',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchWishlist(); 
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      toast({
        title: 'Error!',
        description: 'Unable to remove product from wishlist. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    
  };

  return (
    <VStack spacing={8} p={8} align="stretch" bg="gray.50" borderRadius="md">
  <Text fontSize="3xl" fontWeight="bold" textAlign="center" color="#010156" mb={6}>
    Welcome to Your Dashboard
  </Text>

  {/* Product Suggestions */}
  <Box>
    <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
      Product Suggestions
    </Text>
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
  <Box bg="gray.100" p={6} borderRadius="lg" boxShadow="md">
    <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
      Purchased Items
    </Text>
    {purchasedItems.length > 0 ? (
      <SimpleGrid columns={gridColumns} spacing={6}>
        {purchasedItems.map((item) => (
          <Box
            key={item._id}
            borderWidth={1}
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
            _hover={{ boxShadow: '2xl' }}
          >
            <Image
              src={item.img}
              alt={item.title}
              height="150px"
              borderRadius="md"
              objectFit="cover"
              mb={4}
            />
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              £{item.price.toFixed(2)}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    ) : (
      <Text fontSize="md" color="gray.500" textAlign="center">
        You have no purchased items yet.
      </Text>
    )}
  </Box>

  {/* Wishlist */}
  <Box bg="gray.100" p={6} borderRadius="lg" boxShadow="md">
    <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
      Wishlist
    </Text>
    {loadingWishlist ? (
      <Spinner size="lg" color="teal.500" />
    ) : wishlistItems.length > 0 ? (
      <SimpleGrid columns={gridColumns} spacing={6}>
        {wishlistItems.map((item) => (
          <Box
            key={item._id}
            borderWidth={1}
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
            _hover={{ boxShadow: '2xl' }}
          >
            <Image
              src={`${item.img}`}
              alt={item.title}
              height="150px"
              borderRadius="md"
              objectFit="cover"
              mb={4}
            />
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              £{item.price.toFixed(2)}
            </Text>
            <Button
              mt={2}
              colorScheme="red"
              size="sm"
              onClick={() => handleRemoveFromWishlist(item._id)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    ) : (
      <Text fontSize="md" color="gray.500" textAlign="center">
        Your wishlist is empty.
      </Text>
    )}
  </Box>
</VStack>
  );
};


