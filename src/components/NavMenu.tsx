import React, { useContext } from 'react';
import { UserContext } from "../usercontext";
import { useCart } from "./Cart/CartContext";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { LogOut } from "../components/Logout";
import { FaUserCircle, FaBars, FaAngleDown, FaHeart, FaShoppingCart } from 'react-icons/fa';

export const NavMenu: React.FC = () => {
  const { user } = useContext(UserContext);
  const { cartCount } = useCart();
  const { isOpen, onToggle } = useDisclosure();

  // Determine cart color based on item count
  const cartColor = cartCount > 0 ? '#e65d0f' : 'white';

  return (
    <Box className="container-fluid blu mb-30">
      <Flex px={{ base: 4, xl: 5 }} flexDirection={{ base: 'column', lg: 'row' }}>
        {/* Sidebar for Categories */}
        <Box className="col-lg-3 d-none d-lg-block">
          <Box
            as="button"
            onClick={onToggle}
            width="100%"
            height="65px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className="orange text-light"
            bg="blue.600"
            color="white"
            px={4}
            borderRadius="md"
          >
            <HStack>
              <FaBars />
              <Text m={0}>VoIP Hardware</Text>
            </HStack>
            <FaAngleDown />
          </Box>
          {isOpen && (
            <Box
              mt={2}
              bg="gray.100"
              boxShadow="md"
              borderRadius="md"
              position="absolute"
              zIndex={1}
              width="100%"
              className="navbar-light"
            >
              <VStack spacing={0} align="stretch">
                <Link className="dropdown-item" href="/yealink">
                  Yealink
                </Link>
                <Link className="dropdown-item" href="/cisco">
                  Cisco
                </Link>
                <Link className="dropdown-item" href="/fanvil">
                  Fanvil
                </Link>
                <Link className="dropdown-item" href="/grandstream">
                  Grandstream
                </Link>
              </VStack>
            </Box>
          )}
        </Box>

        {/* Main Navbar */}
        <Box className="col-lg-9">
          <Flex as="nav" className="navbar navbar-expand-lg blu navbar-dark py-3 py-lg-0 px-0">
            <Link className="text-decoration-none d-block d-lg-none" href="#">
              <img src={require("../assets/images/logo/logo.png")} alt="sitelogo" width="36%" />
            </Link>
            <IconButton
              variant="outline"
              aria-label="Toggle Navigation"
              icon={<FaAngleDown />}
              onClick={onToggle}
              className="navbar-toggler"
            />
            <Flex justifyContent="space-between" className={`navbar-collapse miniMenu ${isOpen ? '' : 'collapse'}`}>
              <Flex justifyContent="space-between" className="navbar-nav mr-auto py-0">
                <Link href="/shop" className="nav-item nav-link">Shop</Link>
                <Link href="/packages" className="nav-item nav-link">Packages</Link>
              </Flex>
              <HStack spacing={4} className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <Flex justifyContent="space-between">
                  <Link className="btn px-0" href="/wishlist">
                    <FaHeart className="text-white" />
                    <span className="badge text-white border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                  </Link>
                  <Link className="btn px-0 ml-3" href="/cart">
                    <FaShoppingCart style={{ color: cartColor }} />
                    <span
                      className="badge border border-secondary rounded-circle"
                      style={{
                        paddingBottom: '2px',
                        color: cartColor,
                        borderColor: cartColor,
                      }}
                    >
                      {cartCount}
                    </span>
                  </Link>
                  {user ? (
                    <HStack spacing={3} align="center">
                      <Text className="d-inline">Hi {user && user.firstName}</Text>
                      <Link href="/profile">
                        <FaUserCircle color="#ffffff" height="20px" width="20px" />
                      </Link>
                      <LogOut />
                    </HStack>
                  ) : (
                    <></>
                  )}
                </Flex>
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
