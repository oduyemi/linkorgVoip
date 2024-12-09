import React from 'react';
import { Button, useToast, Box, Text, Flex, Stack, IconButton, Link } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from './CartContext'; // Import the useCart hook

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart(); // Use the context
  const toast = useToast();

  const handleIncreaseQuantity = (id: string) => {
    addToCart({ id, title: '', price: 0, quantity: 1, img: '' }); // Custom logic to increase quantity
  };

  const handleDecreaseQuantity = (id: string) => {
    addToCart({ id, title: '', price: 0, quantity: -1, img: '' }); // Custom logic to decrease quantity
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: 'Item Removed!',
      description: 'The item has been removed from your cart.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
                    <img src={item.img} alt={item.title} />
                  </Box>
                  <Box ml={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Text color="gray.600">
                    &#163;{item.price.toFixed(2)} each
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
                  Subtotal: &#163;{(item.price * item.quantity).toFixed(2)}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      {/* Total Price and Checkout Section */}
      <Box mt={6} p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" className="blutext">
            Total: &#163;{calculateTotal().toFixed(2)}
          </Text>
          <Link href="/checkout">
            <Button
              colorScheme="orange"
              size="lg"
              onClick={() => toast({ title: 'Proceeding to Checkout', status: 'info' })}
            >
              Proceed to Checkout
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};
