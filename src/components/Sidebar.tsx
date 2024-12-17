import React from "react";
import { Box, VStack, HStack, Button, Icon, Text, Divider, Link } from "@chakra-ui/react";
import { FaUserCircle, FaShoppingCart, FaHeart, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../usercontext";

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const { user } = React.useContext(UserContext);

  return (
    <Box
      bg="#010156"
      color="white"
      w={{ base: "full", md: "250px" }}
      p={6}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="fixed"
      bottom={0}
      height="70vh"
      shadow="md"
      zIndex={1}
    >
      <VStack align="start" spacing={6}>
        <HStack spacing={4}>
          <Icon as={FaUserCircle} boxSize={8} />
          <Text fontSize="2xl" fontWeight="bold">
            {user?.firstName} {user?.lastName}
          </Text>
        </HStack>
        <Divider borderColor="whiteAlpha.400" />
        <VStack align="start" spacing={4} w="full">
          <Link href="/dashboard/my-cart">
            <Button leftIcon={<FaShoppingCart />} variant="ghost" colorScheme="whiteAlpha" w="full" _hover={{ bg: "whiteAlpha.300" }}>
            My Cart
          </Button>
          </Link>
          <Link href="/dashboard/wishlist"><Button leftIcon={<FaHeart />} variant="ghost" colorScheme="whiteAlpha" w="full" _hover={{ bg: "whiteAlpha.300" }}>
            Wishlist
          </Button>
          </Link>
          <Link href="/dashboard/my-cart"><Button leftIcon={<FaCog />} variant="ghost" colorScheme="whiteAlpha" w="full" _hover={{ bg: "whiteAlpha.300" }}>
            Settings
          </Button>
          </Link>
        </VStack>
      </VStack>
      <Button leftIcon={<FaSignOutAlt />} colorScheme="orange" variant="solid" w="full" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};

