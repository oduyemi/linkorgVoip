import React, { useState } from 'react';
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

// Define the product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
}

export const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([
    {
      id: '1',
      name: 'Smartwatch',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/300x200',
      isNew: true,
    },
    {
      id: '2',
      name: 'Bluetooth Speaker',
      price: 79.99,
      imageUrl: 'https://via.placeholder.com/300x200',
    },
  ]);

  const toast = useToast();

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== productId));
    toast({
      title: 'Item Removed',
      description: 'The item has been removed from your wishlist.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch" p={6}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        My Wishlist
      </Text>
      <Divider mb={4} />
      {wishlist.length > 0 ? (
        wishlist.map((product) => (
          <Box
            key={product.id}
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
                src={product.imageUrl}
                alt={product.name}
                boxSize="120px"
                borderRadius="md"
                objectFit="cover"
              />
              <VStack align="start" flex="1" spacing={2}>
                <HStack>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    {product.name}
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
                  onClick={() => handleRemoveFromWishlist(product.id)}
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

