import React from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  Image,
  VStack,
} from '@chakra-ui/react';
import {
  FaThLarge,
  FaBars,
  FaShoppingCart,
  FaHeart,
  FaSyncAlt,
  FaSearch,
  FaStar,
  FaStarHalfAlt,
} from 'react-icons/fa';
import yealinkW76P from "../../assets/images/flyers/yealinkW76P.jpg";
import yealinkT48U from "../../assets/images/flyers/yealinkT48U.jpg";
import yealinkW73P from "../../assets/images/flyers/yealinkW73P.jpg";

const products = [
  {
    id: 1,
    name: "Yealink - T48U",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 5,
    imageUrl: yealinkT48U,
  },
  {
    id: 2,
    name: "Yealink - W73P",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 4.5,
    imageUrl: yealinkW73P,
  },
  {
    id: 3,
    name: "Yealink - W76P",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 4,
    imageUrl: yealinkW76P,
  },
  {
    id: 4,
    name: "Yealink - W73P",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 3,
    imageUrl: yealinkW73P,
  },
  {
    id: 5,
    name: "Yealink - T48U",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 5,
    imageUrl: yealinkT48U,
  },
  {
    id: 6,
    name: "Yealink - W76P",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 4.5,
    imageUrl: yealinkW76P,
  },
  {
    id: 7,
    name: "Yealink - T48U",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 4,
    imageUrl: yealinkT48U,
  },
  {
    id: 8,
    name: "Yealink - W76P",
    price: '£123.00',
    oldPrice: '£145.00',
    rating: 3.5,
    imageUrl: yealinkW76P,
  },
];

export const AllProducts: React.FC = () => {
  const columns = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  return (
    <Box p={4}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Flex>
          <IconButton aria-label="Grid view" icon={<FaThLarge />} variant="outline" size="sm" />
          <IconButton aria-label="List view" icon={<FaBars />} variant="outline" size="sm" ml={2} />
        </Flex>
        <Flex>
          <Button size="sm" variant="outline" mr={2}>Sorting</Button>
          <Button size="sm" variant="outline">Showing</Button>
        </Flex>
      </Flex>

      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
        {products.map((product) => (
          <Box 
            key={product.id} 
            bg="white" 
            borderRadius="md" 
            boxShadow="md" 
            overflow="hidden" 
            mb={4} 
            position="relative"
            _hover={{ boxShadow: "lg" }}  
          >
            <Image src={product.imageUrl} alt={product.name} width="100%" height="auto" />

            <Flex 
              position="absolute" 
              top="36%" 
              left="50%" 
              transform="translate(-50%, -50%)" 
              opacity={0} 
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }} 
              zIndex={1}
              gap={2}
            >
              <Tooltip label="Add to Cart" aria-label="Add to Cart">
                <IconButton aria-label="Add to Cart" icon={<FaShoppingCart />} variant="outline" size="sm" />
              </Tooltip>
              <Tooltip label="Add to Wishlist" aria-label="Add to Wishlist">
                <IconButton aria-label="Add to Wishlist" icon={<FaHeart />} variant="outline" colorScheme="red" size="sm" />
              </Tooltip>
              <Tooltip label="Compare" aria-label="Compare">
                <IconButton aria-label="Compare" icon={<FaSyncAlt />} variant="outline" size="sm" />
              </Tooltip>
              <Tooltip label="View Details" aria-label="View Details">
                <IconButton aria-label="View Details" icon={<FaSearch />} variant="outline" size="sm" />
              </Tooltip>
            </Flex>

            <Box textAlign="center" py={4}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="semibold" isTruncated>{product.name}</Text>
                <Flex alignItems="center" justifyContent="center">
                  <Text fontSize="xl" fontWeight="bold">{product.price}</Text>
                  <Text fontSize="sm" color="gray.500" ml={2} textDecoration="line-through">{product.oldPrice}</Text>
                </Flex>
                <Flex alignItems="center" justifyContent="center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Box as="span" key={index} color={index < Math.floor(product.rating) ? 'yellow.400' : 'gray.400'}>
                      {index < product.rating ? <FaStar /> : <FaStarHalfAlt />}
                    </Box>
                  ))}
                  <Text ml={2} fontSize="sm">({product.rating * 20})</Text>
                </Flex>
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
