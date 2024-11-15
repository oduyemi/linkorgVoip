import React, { useState } from 'react';
import { Button, useToast, Box, Text, Flex, Stack, IconButton } from '@chakra-ui/react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon for remove button

// Define types for cart item
interface CartItem {
  id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

// Define Cart component
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productName: 'Wireless Headphones',
      productPrice: 149.99,
      productImage: 'https://via.placeholder.com/150',
      quantity: 1,
    },
    {
      id: '2',
      productName: 'Bluetooth Speaker',
      productPrice: 89.99,
      productImage: 'https://via.placeholder.com/150',
      quantity: 2,
    },
  ]);
  const toast = useToast();

  // Handle increasing quantity
  const handleIncreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle removing item from cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
      title: 'Item Removed!',
      description: 'The item has been removed from your cart.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" className="blutext" mb={6}>
        Your Cart
      </Text>
      {cartItems.length === 0 ? (
        <Text textAlign="center">Your cart is empty!</Text>
      ) : (
        <Stack spacing={6}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              border="1px solid #ddd"
              borderRadius="md"
              boxShadow="lg"
              p={4}
              _hover={{ boxShadow: 'xl' }}
              bg="white"
              transition="all 0.3s ease-in-out"
            >
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box boxSize="100px">
                    <img src={item.productImage} alt={item.productName} />
                  </Box>
                  <Box ml={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {item.productName}
                    </Text>
                    <Text color="gray.600">
                      ${item.productPrice.toFixed(2)} each
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center">
                  <IconButton
                    icon={<FaTrashAlt />}
                    colorScheme="red"
                    aria-label="Remove item"
                    onClick={() => handleRemoveItem(item.id)}
                    size="sm"
                  />
                </Flex>
              </Flex>

              <Flex align="center" justify="space-between" mt={4}>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </Button>
                <Text fontSize="lg">{item.quantity}</Text>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </Button>
              </Flex>
              <Flex justify="space-between" mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Subtotal: ${(item.productPrice * item.quantity).toFixed(2)}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      {/* Total Price and Checkout Section */}
      <Box mt={6} p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Total: ${calculateTotal().toFixed(2)}
          </Text>
          <Button
            colorScheme="orange"
            size="lg"
            onClick={() => toast({ title: 'Proceeding to Checkout', status: 'info' })}
          >
            Proceed to Checkout
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;
