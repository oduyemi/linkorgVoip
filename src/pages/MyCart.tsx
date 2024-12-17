import React, { useEffect, useState, useContext } from "react";
import { Box, Heading, Button, Text, Spinner, Center, SimpleGrid, GridItem, IconButton } from "@chakra-ui/react";
import { UserContext } from "../usercontext";
import { Product } from "../components/Shop/AllProducts";
import {Sidebar} from "../components/Sidebar";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export const MyCart: React.FC = () => {
  const { user, handleLogout } = useContext(UserContext);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleMyCart = async () => {
    try {
      const response = await axios.get(
        `https://linkorg-voip.vercel.app/api/v1/cart/${user?._id}`
      );
      setCartItems(response.data.data);
    } catch (error) {
      setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (productId: string) => {
    try {
      await axios.delete(
        `https://linkorg-voip.vercel.app/api/v1/cart/${user?._id}/${productId}`
      );
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    } catch (error) {
      setError("Failed to remove item from cart.");
    }
  };

  useEffect(() => {
    if (user?._id) {
      handleMyCart();
    }
  }, [user?._id]);

  return (
    <Box>
      <Heading ml={4} mb={6} fontSize="2xl" color="teal.600">
        My Cart
      </Heading>
      <Box display="flex">
        <Sidebar onLogout={handleLogout} />
        <Box flex={1} ml={{ base: 0, md: "250px" }} mt={8} px={6}>
          {loading ? (
            <Center>
              <Spinner size="xl" color="orange" />
            </Center>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {cartItems.length === 0 ? (
                <GridItem colSpan={3}>
                  <Text color="gray.500" textAlign="center">
                    Your cart is empty.
                  </Text>
                </GridItem>
              ) : (
                cartItems.map((item) => (
                  <Box
                    key={item._id}
                    bg="white"
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg", transform: "scale(1.05)", transition: "all 0.3s ease" }}
                  >
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="300px">
                      <Text fontSize="lg" fontWeight="bold" color="teal.600">
                        {item.webName}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        £{item.price.toFixed(2)}
                      </Text>
                      <IconButton
                        mt={4}
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="outline"
                        aria-label="Remove from cart"
                        onClick={() => handleRemoveFromCart(item._id)}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </SimpleGrid>
          )}
          {cartItems.length > 0 && (
            <Button
              mt={6}
              colorScheme="teal"
              size="lg"
              w="full"
              onClick={() => alert("Proceeding to Checkout...")}
            >
              Proceed to Checkout
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

