import React from "react";
import { Button, useToast, Box, Text, Flex, Stack, IconButton, Link } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart, CartItem } from "./CartContext";

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const toast = useToast();

  const handleIncreaseQuantity = (id: string) => {
    addToCart({ id, title: "", price: 0, quantity: 1 });
  };

  const handleDecreaseQuantity = (id: string) => {
    addToCart({ id, title: "", price: 0, quantity: -1 });
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item Removed!",
      description: "The item has been removed from your cart.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
        Your Cart
      </Text>
      {cartItems.length === 0 ? (
        <Text textAlign="center">Your cart is empty!</Text>
      ) : (
        <Stack spacing={6}>
          {cartItems.map((item: CartItem) => (
            <Box
              key={item.id}
              border="1px solid #ddd"
              borderRadius="md"
              p={4}
              bg="white"
              boxShadow="sm"
            >
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box boxSize="100px">
                    <img src={item.img || "/default-image.png"} alt={item.title} />
                  </Box>
                  <Box ml={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Text color="gray.600">£{item.price.toFixed(2)}</Text>
                  </Box>
                </Flex>
                <IconButton
                  icon={<FaTrashAlt />}
                  colorScheme="red"
                  aria-label="Remove item"
                  onClick={() => handleRemoveItem(item.id)}
                />
              </Flex>
              <Flex mt={4} align="center" justify="space-between">
                <Button size="sm" onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </Button>
                <Text>{item.quantity}</Text>
                <Button size="sm" onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
      <Box mt={6} bg="gray.50" p={4} borderRadius="md">
        <Flex justify="space-between">
          <Text fontSize="xl" fontWeight="bold">
            Total: £{calculateTotal().toFixed(2)}
          </Text>
          <Link href="/checkout">
            <Button colorScheme="orange" size="lg">
              Checkout
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};
