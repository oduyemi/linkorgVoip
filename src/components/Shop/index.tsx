import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  Badge,
  Stack,
  Flex,
  Spinner,
  useColorMode,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { brandUrls, Product, AllProducts } from "./AllProducts";
import axios from "axios";

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["all"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { colorMode, toggleColorMode } = useColorMode();

  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "£0 - £100", range: [0, 100] },
    { label: "£100 - £200", range: [100, 200] },
    { label: "£200 - £300", range: [200, 300] },
    { label: "£300 - £400", range: [300, 400] },
    { label: "£400 - £500", range: [400, 500] },
    { label: "£500 - £700", range: [500, 700] },
    { label: "£700 - £1000", range: [700, 1000] },
  ];

  const handleCheckboxChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (selectedBrands.includes("all") || selectedBrands.length === 0) {
        const response = await axios.get(brandUrls["all"]);
        setProducts(response.data.data);
      } else {
        const brandRequests = selectedBrands.map((brand) =>
          axios.get(brandUrls[brand])
        );
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

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [products, priceRange]);

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

  const sidebarBg = useColorModeValue("gray.50", "gray.700");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" mb={4}>
        <Heading>Shop</Heading>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Flex>
      <Flex flexWrap="wrap" gap={5}>
        {/* Shop Sidebar Start */}
        <Box w={{ base: "100%", md: "30%", lg: "25%" }} boxShadow="md" bg={sidebarBg} borderRadius="md" p={5}>
          {/* Price Filter */}
          <Heading as="h6" fontSize="lg" mb={3} textTransform="uppercase" color={headingColor}>
            Filter by price
          </Heading>
          <FormControl as="form">
            <Checkbox
              isChecked={priceRange[0] === 0 && priceRange[1] === 1000}
              onChange={() => setPriceRange([0, 1000])}
            >
              All Price
              <Badge ml={2} colorScheme="blue">
                {filteredProducts.length}
              </Badge>
            </Checkbox>
            <Stack spacing={3} mt={3}>
              {priceRanges.map((range, index) => {
                const count = products.filter(
                  (product) =>
                    product.price >= range.range[0] &&
                    product.price <= range.range[1]
                ).length;
                return (
                  <Checkbox
                    key={index}
                    isChecked={
                      priceRange[0] === range.range[0] &&
                      priceRange[1] === range.range[1]
                    }
                    onChange={() => handleCheckboxChange(range.range)}
                  >
                    {range.label}
                    <Badge ml={2} colorScheme={count ? "green" : "gray"}>
                      {count}
                    </Badge>
                  </Checkbox>
                );
              })}
            </Stack>
          </FormControl>
          {/* Brand Filter */}
          <Heading as="h6" fontSize="lg" mt={6} mb={3} textTransform="uppercase" color={headingColor}>
            Filter by brand
          </Heading>
          <FormControl as="form">
            <Stack spacing={3} mt={3}>
              {["all", "cisco", "fanvil", "grandstream", "yealink"].map(
                (brand, index) => (
                  <Checkbox
                    key={index}
                    isChecked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  >
                    {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    <Icon as={CheckCircleIcon} ml={2} color="gray" />
                  </Checkbox>
                )
              )}
            </Stack>
          </FormControl>
        </Box>
        {/* Shop Sidebar End */}

        {/* Shop Product Start */}
        <Box flex="1">
          {loading ? (
            <Spinner size="xl" color="blue.500" />
          ) : (
            <AllProducts priceRange={priceRange} products={filteredProducts} />
          )}
        </Box>
        {/* Shop Product End */}
      </Flex>
    </Box>
  );
};
