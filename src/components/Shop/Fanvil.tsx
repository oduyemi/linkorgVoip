import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  Badge,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { brandUrls, Product } from "./AllProducts";
import axios from "axios";
import { CiscoProducts } from "./CiscoProducts";
import { FanvilProducts } from "./FanvilProducts";


export const Fanvil: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["fanvil"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

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
      if (selectedBrands.includes("fanvil") || selectedBrands.length === 0) {
        const response = await axios.get(brandUrls["fanvil"]);
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

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [products, priceRange]);

  const handleBrandChange = (brand: string) => {
    if (brand === "fanvil") {
      setSelectedBrands(["fanvil"]);
    } else {
      setSelectedBrands((prevBrands) => {
        const updatedBrands = prevBrands.includes(brand)
          ? prevBrands.filter((b) => b !== brand)
          : [...prevBrands, brand].filter((b) => b !== "fanvil");
        return updatedBrands.length === 0 ? ["fanvil"] : updatedBrands;
      });
    }
  };

  return (
    <Box p={5}>
      <Flex flexWrap="wrap" gap={5}>
        {/* Shop Sidebar Start */}
        <Box w={{ base: "100%", md: "30%", lg: "25%" }}>
          {/* Price Filter */}
          <Heading as="h6" fontSize="lg" mb={3} textTransform="uppercase">
            <Box as="span" color="blue.600">
              Filter by price
            </Box>
          </Heading>
          <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
            <FormControl as="form">
              <Checkbox
                isChecked={priceRange[0] === 0 && priceRange[1] === 1000}
                onChange={() => setPriceRange([0, 1000])}
              >
                All Prices
                <Badge ml={2} fontWeight="normal" border="1px" borderColor="gray.300">
                  {filteredProducts.length}
                </Badge>
              </Checkbox>
              <Stack spacing={3} mt={3}>
                {priceRanges.map((range, index) => {
                  const count = products.filter(
                    (product) => product.price >= range.range[0] && product.price <= range.range[1]
                  ).length;
                  return (
                    <Checkbox
                      key={index}
                      isChecked={priceRange[0] === range.range[0] && priceRange[1] === range.range[1]}
                      onChange={() => handleCheckboxChange(range.range)}
                    >
                      {range.label}
                      <Badge>{count}</Badge>
                    </Checkbox>
                  );
                })}
              </Stack>
            </FormControl>
          </Box>
          {/* Brand Filter */}
          <Heading as="h6" fontSize="lg" mb={3} textTransform="uppercase">
            <Box as="span" color="blue.600">
              Filter by brand
            </Box>
          </Heading>
          <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
            <FormControl as="form">
              <Stack spacing={3} mt={3}>
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
            </FormControl>
          </Box>
        </Box>
        {/* Shop Sidebar End */}

        {/* Shop Product Start */}
        <Box flex="1">
          <FanvilProducts priceRange={priceRange} products={filteredProducts} />
        </Box>
        {/* Shop Product End */}
      </Flex>
    </Box>
  );
};
