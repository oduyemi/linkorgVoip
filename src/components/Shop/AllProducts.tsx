import React, { useEffect, useState } from "react";
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
  Spinner,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import {
  FaThLarge,
  FaBars,
  FaShoppingCart,
  FaHeart,
  FaSyncAlt,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { useCart } from "../Cart/CartContext";

interface Product {
  id: string; // MongoDB object ID
  title: string;
  brand: string;
  img: string;
  price: number;
}

const brandUrls: { [key: string]: string } = {
  all: "https://linkorg-voip.vercel.app/api/v1/products",
  cisco: "https://linkorg-voip.vercel.app/api/v1/products/cisco",
  fanvil: "https://linkorg-voip.vercel.app/api/v1/products/fanvil",
  grandstream: "https://linkorg-voip.vercel.app/api/v1/products/grandstream",
  yealink: "https://linkorg-voip.vercel.app/api/v1/products/yealink",
};

export const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["all"]);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const iconSize = useBreakpointValue({ base: "xs", md: "sm" });

  const { addToCart, getCartCount } = useCart(); 

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (selectedBrands.includes("all") || selectedBrands.length === 0) {
        const response = await axios.get(brandUrls["all"]);
        setProducts(response.data.data);
      } else {
        const brandRequests = selectedBrands.map((brand) => axios.get(brandUrls[brand]));
        const responses = await Promise.all(brandRequests);
        const fetchedProducts = responses.flatMap((res) => res.data.data);
        setProducts(fetchedProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands]);

  const handleBrandChange = (brand: string) => {
    if (brand === "all") {
      setSelectedBrands(["all"]);
    } else {
      setSelectedBrands((prevBrands) => {
        const updatedBrands = prevBrands.includes(brand)
          ? prevBrands.filter((b) => b !== brand)
          : [...prevBrands, brand].filter((b) => b !== "all");
        return updatedBrands.length === 0 ? ["all"] : updatedBrands;
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    addToCart(cartProduct); 
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Filter by Brand */}
      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>Filter by Brand:</Text>
        <Stack spacing={2} direction="row">
          <Checkbox isChecked={selectedBrands.includes("all")} onChange={() => handleBrandChange("all")}>
            All
          </Checkbox>
          <Checkbox isChecked={selectedBrands.includes("cisco")} onChange={() => handleBrandChange("cisco")}>
            Cisco
          </Checkbox>
          <Checkbox isChecked={selectedBrands.includes("fanvil")} onChange={() => handleBrandChange("fanvil")}>
            Fanvil
          </Checkbox>
          <Checkbox isChecked={selectedBrands.includes("grandstream")} onChange={() => handleBrandChange("grandstream")}>
            Grandstream
          </Checkbox>
          <Checkbox isChecked={selectedBrands.includes("yealink")} onChange={() => handleBrandChange("yealink")}>
            Yealink
          </Checkbox>
        </Stack>
      </Box>

      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Flex>
          <IconButton aria-label="Grid view" icon={<FaThLarge />} variant="outline" size={iconSize} />
          <IconButton aria-label="List view" icon={<FaBars />} variant="outline" size={iconSize} ml={2} />
        </Flex>
        <Flex>
          <Button size={iconSize} variant="outline" mr={2}>Sorting</Button>
          <Button size={iconSize} variant="outline">Showing</Button>
        </Flex>
      </Flex>

      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
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
            <Image
              src={`https://linkorg-voip.vercel.app/${product.img}`}
              alt={product.title}
              width="100%"
              height="auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/300";
              }}
            />
            <VStack spacing={2} p={4} align="start">
              <Text fontSize="lg" fontWeight="bold" className="blutext">{product.title}</Text>
              <Flex textAlign="center">
                <Text fontSize="md" fontWeight="bold" textAlign="right" color="gray.700">&emsp; ${product.price}</Text> &emsp;
                <Text color="gray.500" textAlign="center">&emsp; {product.brand}</Text>
              </Flex>
              <Box className="text-center">
                &nbsp; &nbsp;
                <Button 
                  leftIcon={<FaShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  colorScheme="orange" variant="outline" mt={3}>
                  Add to Cart
                </Button>
              </Box>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
