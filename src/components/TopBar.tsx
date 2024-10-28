import React from 'react';
import { Box, Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export const TopBar: React.FC = () => {
  return (
    <Box className="container-fluid">
      <Flex className="row bg-secondary py-1 px-xl-5">
        {/* Left-side links */}
        <Box className="col-lg-6 d-none d-lg-block">
          <Flex align="center" h="100%">
            <Link color="gray.600" mr={3} href="/">Home</Link>
            <Link color="gray.600" mr={3} href="/about">About</Link>
            <Link color="gray.600" mr={3} href="/faqs">FAQs</Link>
            <Link color="gray.600" mr={3} href="/contact">Contact</Link>
          </Flex>
        </Box>

        {/* Right-side menu and buttons */}
        <Box className="col-lg-6 text-center text-lg-right">
          <Flex align="center" justify={{ base: "center", lg: "flex-end" }}>
            {/* My Account Dropdown */}
            <Menu>
              <MenuButton as={Button} size="sm" bg="gray.100" rightIcon={<ChevronDownIcon />}>
                My Account
              </MenuButton>
              <MenuList>
                <MenuItem>Login</MenuItem>
                <MenuItem>Register</MenuItem>
              </MenuList>
            </Menu>

            {/* Currency Dropdown */}
            <Menu>
              <MenuButton as={Button} size="sm" bg="gray.100" mx={2} rightIcon={<ChevronDownIcon />}>
                USD
              </MenuButton>
              <MenuList>
                <MenuItem>EUR</MenuItem>
                <MenuItem>GBP</MenuItem>
                <MenuItem>CAD</MenuItem>
              </MenuList>
            </Menu>           
          </Flex>

          {/* Heart and Cart Icons for Mobile */}
          <Flex display={{ base: "flex", lg: "none" }} align="center" ml={2}>
            {/* Favorites (Heart) Icon */}
            <FaHeart color="gray.600" fontSize="24px" />
            <Badge color="gray.600" border="1px solid" borderRadius="full" ml={-2} mb={1}>0</Badge>

            {/* Cart Icon */}
            <FaShoppingCart color="gray.600" fontSize="24px" style={{ marginLeft: '16px' }} />
            <Badge color="gray.600" border="1px solid" borderRadius="full" ml={-2} mb={1}>0</Badge>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
