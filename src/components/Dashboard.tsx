import React from 'react';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Image,
  Divider,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import Slider from 'react-slick'; 
import { useNavigate } from 'react-router-dom'; 



interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate(); 

  // Sample data for purchased items, wishlist, and cart items
  const purchasedItems: Product[] = [
    { id: 1, name: 'Laptop', price: '$1200', imageUrl: '/images/laptop.jpg' },
    { id: 2, name: 'Smartphone', price: '$800', imageUrl: '/images/smartphone.jpg' },
  ];
  const wishlistItems: Product[] = [
    { id: 3, name: 'Smartwatch', price: '$200', imageUrl: '/images/smartwatch.jpg' },
    { id: 4, name: 'Headphones', price: '$100', imageUrl: '/images/headphones.jpg' },
  ];
  const cartItems: Product[] = [
    { id: 5, name: 'Tablet', price: '$300', imageUrl: '/images/tablet.jpg' },
    { id: 6, name: 'Mouse', price: '$20', imageUrl: '/images/mouse.jpg' },
  ];

  // Sample data for product suggestions (this can be dynamic)
  const productSuggestions: Product[] = [
    { id: 7, name: 'Wireless Charger', price: '$50', imageUrl: '/images/charger.jpg' },
    { id: 8, name: 'Portable Speaker', price: '$60', imageUrl: '/images/speaker.jpg' },
    { id: 9, name: 'Bluetooth Earbuds', price: '$90', imageUrl: '/images/earbuds.jpg' },
  ];

  // Use breakpoint value for responsive design
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Slick Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    customPaging: (i: number) => (
      <Box
        borderWidth="1px"
        borderColor="gray.400"
        p={2}
        borderRadius="full"
        bg="white"
        transition="all 0.3s ease-in-out"
        _hover={{ bg: '#010156' }}
      >
        <Text color="gray.500">•</Text>
      </Box>
    ),
  };

  // Handle "Buy Again" button click
  const handleBuyAgain = (id: number) => {
    navigate(`/add-to-cart/${id}`); // Navigate to add-to-cart page
  };

  // Handle "Proceed to Payment" button click
  const handleProceedToPayment = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <VStack spacing={8} p={8} align="stretch" bg="gray.50" borderRadius="md">
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" color="#010156" mb={6}>
        Welcome to Your Dashboard
      </Text>

      {/* Product Suggestions (Slick Slider) */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Product Suggestions
        </Text>
        <Slider {...sliderSettings}>
          {productSuggestions.map((item) => (
            <div key={item.id}>
              <Box
                borderWidth={1}
                borderRadius="lg"
                p={4}
                bg="white"
                boxShadow="md"
                textAlign="center"
                _hover={{ boxShadow: 'xl', transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
                transition="all 0.3s ease-in-out"
              >
                <Image src={item.imageUrl} alt={item.name} boxSize="100%" borderRadius="md" />
                <Text mt={2} fontSize="sm" fontWeight="medium" color="gray.700">{item.name}</Text>
                <Text fontSize="sm" color="gray.500">{item.price}</Text>
                <Button mt={4} colorScheme="teal" size="sm" _hover={{ bg: '#010156' }}>
                  Add to Cart
                </Button>
              </Box>
            </div>
          ))}
        </Slider>
      </Box>
      <Divider />
      {/* Purchased Items */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Purchased Items
        </Text>
        <SimpleGrid columns={gridColumns} spacing={6} mt={4}>
          {purchasedItems.map((item) => (
            <Box
              key={item.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg="white"
              boxShadow="md"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
              transition="all 0.3s ease-in-out"
            >
              <Image src={item.imageUrl} alt={item.name} boxSize="100%" borderRadius="md" />
              <Text mt={2} fontSize="sm" fontWeight="medium" color="gray.700">{item.name}</Text>
              <Text fontSize="sm" color="gray.500">{item.price}</Text>
              <Button
                mt={4}
                colorScheme="teal"
                size="sm"
                onClick={() => handleBuyAgain(item.id)}
                _hover={{ bg: '#010156' }}
              >
                Buy Again
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Divider />

      {/* Wishlist */}
      <Box className="mt-5">
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Wishlist
        </Text>
        <SimpleGrid columns={gridColumns} spacing={6} mt={4}>
          {wishlistItems.map((item) => (
            <Box
              key={item.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg="white"
              boxShadow="md"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
              transition="all 0.3s ease-in-out"
            >
              <Image src={item.imageUrl} alt={item.name} boxSize="100%" borderRadius="md" />
              <Text mt={2} fontSize="sm" fontWeight="medium" color="gray.700">{item.name}</Text>
              <Text fontSize="sm" color="gray.500">{item.price}</Text>
              <Button
                mt={4}
                colorScheme="teal"
                size="sm"
                _hover={{ bg: '#010156' }}
              >
                Add to Cart
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Divider />

      {/* Cart Items */}
      <Box className="my-5">
        <Text fontSize="lg" fontWeight="semibold" color="#010156" mb={4}>
          Cart Items
        </Text>
        <SimpleGrid columns={gridColumns} spacing={6} mt={4}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg="white"
              boxShadow="md"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)', transition: 'all 0.3s ease' }}
              transition="all 0.3s ease-in-out"
            >
              <Image src={item.imageUrl} alt={item.name} boxSize="100%" borderRadius="md" />
              <Text mt={2} fontSize="sm" fontWeight="medium" color="gray.700">{item.name}</Text>
              <Text fontSize="sm" color="gray.500">{item.price}</Text>
              <Button
                mt={4}
                colorScheme="blue"
                size="sm"
                onClick={handleProceedToPayment}
                _hover={{ bg: '#010156' }}
              >
                Proceed to Payment
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};