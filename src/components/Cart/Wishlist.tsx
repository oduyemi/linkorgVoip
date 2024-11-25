import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  useToast,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

// Define the product type
interface Product {
  _id: string;
  title: string;
  price: number;
  img: string;
  isNew?: boolean;
}

export const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const toast = useToast();

  // Fetch wishlist data from the backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get('https://linkorg-voip.vercel.app/api/v1/wishlist'); 
      setWishlist(response.data.items);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load wishlist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await axios.delete(`https://linkorg-voip.vercel.app/api/v1/wishlist/${productId}`); 
      setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
      toast({
        title: 'Item Removed',
        description: 'The item has been removed from your wishlist.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item from wishlist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: 'Added to Cart',
      description: `${product.title} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <VStack spacing={6} align="stretch" p={6}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        My Wishlist
      </Text>
      <Divider mb={4} />
      {wishlist.length > 0 ? (
        wishlist.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
            bg="white"
            p={4}
          >
            <HStack spacing={4} alignItems="flex-start">
              <Image
                src={`https://linkorg-voip.vercel.app/${product.img}`}
                alt={product.title}
                boxSize="120px"
                borderRadius="md"
                objectFit="cover"
              />
              <VStack align="start" flex="1" spacing={2}>
                <HStack>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    {product.title}
                  </Text>
                  {product.isNew && (
                    <Badge colorScheme="green" ml={2}>
                      New
                    </Badge>
                  )}
                </HStack>
                <Text color="green.500" fontWeight="bold">
                  ${product.price.toFixed(2)}
                </Text>
              </VStack>
              <VStack spacing={2}>
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  leftIcon={<FaShoppingCart />}
                >
                  Add to Cart
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  leftIcon={<FaTrash />}
                  _hover={{ bg: 'red.100' }}
                >
                  Delete
                </Button>
              </VStack>
            </HStack>
          </Box>
        ))
      ) : (
        <Text color="gray.500" textAlign="center" mt={6}>
          Your wishlist is empty.
        </Text>
      )}
    </VStack>
  );
};
