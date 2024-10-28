import React from "react";
import { Box, Checkbox, FormControl, Heading, Badge, Stack } from "@chakra-ui/react";
import { AllProducts } from "./AllProducts";

export const Grandstream: React.FC = () => {
  return (
    <Box className="container-fluid">
      <Box className="row px-xl-5">
        {/* Shop Sidebar Start */}
        <Box className="col-lg-3 col-md-4">
          {/* Price Start */}
          <Heading as="h6" className="section-title position-relative text-uppercase mb-3">
            <Box className="blutext pr-3 filter">Filter by price</Box>
          </Heading>
          <Box className="bg-light p-4 mb-10">
            <FormControl as="form">
              <Checkbox defaultChecked id="price-all">
                All Price
                <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                  1000
                </Badge>
              </Checkbox>
              <Stack spacing={3} mt={3}>
                <Checkbox id="price-1">
                  £0 - £100
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    150
                  </Badge>
                </Checkbox>
                <Checkbox id="price-2">
                  £100 - £200
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    295
                  </Badge>
                </Checkbox>
                <Checkbox id="price-3">
                  £200 - £300
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    246
                  </Badge>
                </Checkbox>
                <Checkbox id="price-4">
                  £300 - £400
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    145
                  </Badge>
                </Checkbox>
                <Checkbox id="price-5">
                  £400 - £500
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    168
                  </Badge>
                </Checkbox>
              </Stack>
            </FormControl>
          </Box>
          {/* Price End */}

          {/* Brand Start */}
          <Heading as="h6" className="section-title position-relative text-uppercase mb-3">
            <Box className="blutext filter pr-3">Filter by Brand</Box>
          </Heading>
          <Box className="bg-light p-4 mb-10">
            <FormControl as="form">
              <Checkbox defaultChecked id="color-all">
                All Brands
                <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                  1000
                </Badge>
              </Checkbox>
              <Stack spacing={3} mt={3}>
                <Checkbox id="color-1">
                  Cisco
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    150
                  </Badge>
                </Checkbox>
                <Checkbox id="color-2">
                  Fanvil
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    295
                  </Badge>
                </Checkbox>
                <Checkbox id="color-3">
                  Grandstream
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    246
                  </Badge>
                </Checkbox>
                <Checkbox id="color-4">
                  Yealink
                  <Badge borderWidth="1px" borderColor="gray.300" fontWeight="normal" ml="2">
                    145
                  </Badge>
                </Checkbox>
              </Stack>
            </FormControl>
          </Box>
          {/* Brand End */}
        </Box>
        {/* Shop Sidebar End */}

        {/* Shop Product Start */}
        <Box className="col-lg-9 col-md-8">
          <AllProducts />
        </Box>
        {/* Shop Product End */}
      </Box>
    </Box>
  );
};

