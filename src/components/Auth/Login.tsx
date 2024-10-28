import React from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

export const LoginForm: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="70vh" alignItems="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        width={{ base: '90%', sm: '400px' }} 
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center" color={useColorModeValue('gray.800', 'white')}>
          Log In
        </Heading>
        
        <FormControl id="email" mb={3}>
          <FormLabel htmlFor="email" color={useColorModeValue('gray.800', 'gray.300')}>Email Address</FormLabel>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            bg={useColorModeValue('white', 'gray.600')}
            _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
          />
        </FormControl>
        
        <FormControl id="password" mb={6}>
          <FormLabel htmlFor="password" color={useColorModeValue('gray.800', 'gray.300')}>Password</FormLabel>
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            bg={useColorModeValue('white', 'gray.600')}
            _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
          />
        </FormControl>
        
        <Button colorScheme="orange" mb={8} size="lg" _hover={{ bg: 'orange.600' }} _active={{ bg: 'orange.700' }}>
          Log In
        </Button>

        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="dark_mode" mb="0" color={useColorModeValue('gray.800', 'gray.300')}>
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="orange"
            size="lg"
            onChange={toggleColorMode}
            ml={3}
          />
        </FormControl>

        <Text textAlign="center" mt={4} color={useColorModeValue('gray.600', 'gray.400')}>
          Don&apos;t have an account? <Button variant="link" colorScheme="teal" size="sm"><a href="/register">Register</a></Button>
        </Text>
      </Flex>
    </Flex>
  );
};
