import React from "react";
import { Button, useToast, Box, Text, Flex, Stack, IconButton, Link, Heading } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart, CartItem } from "./CartContext";

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const toast = useToast();

  const handleIncreaseQuantity = (id: string) => {
    addToCart({ id, title: "", img: "", price: 0, quantity: 1 });
  };

  const handleDecreaseQuantity = (id: string) => {
    addToCart({ id, title: "", img:"", price: 0, quantity: -1 });
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
      <Text fontSize="2xl" fontWeight="bold" className="blutext" textAlign="center" mb={6}>
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
              <Flex align="center" justify="center">
                <Flex align="center">
                  <Box boxSize="100px">
                    <img src={item.img } alt={item.title} />
                  </Box>
                  <Box ml={4}>
                    <Text fontSize="xl" fontWeight="semiBold" className="text-center">
                      &emsp; &emsp; {`${item.title}`} &emsp; &emsp;
                    </Text>
                    <Text color="gray.600" className="text-center"> &emsp; &emsp;£{item.price.toFixed(2)} &emsp; &emsp;</Text>
                  </Box>
                </Flex>
                &emsp; &emsp;<IconButton
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
          <Button
            colorScheme="orange"
            size="lg"
            onClick={() => {
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              window.location.href = `https://buy.stripe.com/5kA7umaTj0r08TK289`;
            }}
          >
            Checkout
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
