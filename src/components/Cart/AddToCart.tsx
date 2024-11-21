import React from 'react';
import { Button, Box, Text, Image, useToast, Stack } from '@chakra-ui/react';
import { FaCartPlus } from 'react-icons/fa'; 

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}


const AddToCart: React.FC = () => {
  const toast = useToast();

  const product: Product = {
    id: '1',
    name: 'Wireless Headphones',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/300x200',
    description: 'High-quality wireless headphones with noise cancellation.',
  };


  const handleAddToCart = () => {
    toast({
      title: 'Item Added to Cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      p={4}
      border="1px solid #ddd"
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      _hover={{
        boxShadow: 'xl',
      }}
      transition="all 0.3s ease-in-out"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        borderRadius="md"
        mb={4}
        boxSize="100%"
        objectFit="cover"
      />
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2}>
        {product.name}
      </Text>
      <Text color="gray.600" mb={4}>
        {product.description}
      </Text>
      <Text fontSize="lg" fontWeight="bold" color="black.500" mb={4}>
        ${product.price.toFixed(2)}
      </Text>

      <Stack direction="row" spacing={4} justify="center">
        <Button
          leftIcon={<FaCartPlus />}
          colorScheme="orange"
          variant="solid"
          size="lg"
          width="full"
          onClick={handleAddToCart}
          _hover={{
            bg: 'orange.600',
          }}
          _active={{
            bg: 'orange.700',
          }}
        >
          Add to Cart
        </Button>
      </Stack>
    </Box>
  );
};

export default AddToCart;
