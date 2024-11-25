import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Divider,
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
  price: string;
  img: string;
}

interface FlashMessage {
  type: string;
  message: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
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
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);
  

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

  const handleAddToCart = async (productId: string) => {
    if (!user || !user._id) {
      toast({
        title: "Error!",
        description: "User information is missing. Please log in.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    const userId = user._id;
    const quantity = 1;
  
    try {
      const response = await axios.post(
        'https://linkorg-voip.vercel.app/api/v1/cart/add',
        { userId, productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
  
      toast({
        title: "Success!",
        description: response.data.message || "Product added to cart successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Unable to add product to cart. Please try again later.";
      console.error("Failed to add to cart:", error);
      toast({
        title: "Error!",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      fetchWishlist(); // Refresh wishlist
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
              <div key={item._id}>
                <Box
                  borderWidth={1}
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  boxShadow="md"
                  textAlign="center"
                  _hover={{
                    boxShadow: 'xl',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                  }}
                  transition="all 0.3s ease-in-out"
                >
                  <Image
                    src={`https://linkorg-voip.vercel.app/${item.img}`}
                    alt={item.title}
                    height="200px"
                    borderRadius="md"
                    className="mx-auto"
                  />
                  <Heading mt={4} fontSize="md" fontWeight="medium" className="blutext">
                    {item.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.700">
                    £{item.price}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="orange"
                    size="sm"
                    onClick={() => handleAddToCart(item._id)}
                    _hover={{ bg: '#010156' }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </div>
            ))}
          </Slider>
        )}
      </Box>

      {/* Purchased Items */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Purchased Items
        </Text>
        {purchasedItems.length > 0 ? (
          <SimpleGrid columns={gridColumns} spacing={6} mt={4}>
            {purchasedItems.map((item) => (
              <Box key={item._id} borderWidth={1} p={4} bg="white" boxShadow="md">
                <Image src={item.img} alt={item.title} />
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="md" color="gray.500" textAlign="center" mt={4}>
            You have no purchased items yet.
          </Text>
        )}
      </Box>

      {/* Wishlist */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Wishlist
        </Text>
        {loadingWishlist ? (
          <Spinner size="lg" color="teal.500" />
        ) : wishlistItems.length > 0 ? (
          <SimpleGrid columns={gridColumns} spacing={6} mt={4}>
            {wishlistItems.map((item) => (
              <Box key={item._id} borderWidth={1} p={4} bg="white" boxShadow="md">
                <Image src={item.img} alt={item.title} />
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
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
          <Text fontSize="md" color="gray.500" textAlign="center" mt={4}>
            Your wishlist is empty.
          </Text>
        )}
      </Box>
    </VStack>
  );
};


