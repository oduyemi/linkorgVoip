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
  VStack,
} from '@chakra-ui/react';

export const RegisterForm: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" alignItems="center" marginBottom="7%" marginTop="5%" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        width={{ base: '90%', sm: '400px' }}
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center" color={useColorModeValue('gray.800', 'white')}>
          Register
        </Heading>

        <VStack spacing={4}>
          <FormControl id="first-name" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>First Name</FormLabel>
            <Input
              type="text"
              placeholder="John"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>

          <FormControl id="last-name" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Doe"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>

          <FormControl id="phone" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>Phone Number</FormLabel>
            <Input
              type="tel"
              placeholder="+1234567890"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>Password</FormLabel>
            <Input
              type="password"
              placeholder="**********"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>

          <FormControl id="confirm-password" isRequired>
            <FormLabel color={useColorModeValue('gray.800', 'gray.300')}>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="**********"
              variant="filled"
              bg={useColorModeValue('white', 'gray.600')}
              _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
            />
          </FormControl>
        </VStack>

        <Button colorScheme="orange" size="lg" mt={6} _hover={{ bg: 'orange.600' }} _active={{ bg: 'orange.700' }}>
          Register
        </Button>

        <FormControl display="flex" alignItems="center" justifyContent="center" mt={4}>
          <FormLabel htmlFor="dark_mode" mb="0" color={useColorModeValue('gray.800', 'gray.300')}>
            Enable Dark Mode?
          </FormLabel>
          <Switch id="dark_mode" colorScheme="teal" size="lg" onChange={toggleColorMode} ml={3} />
        </FormControl>

        <Text textAlign="center" mt={4} color={useColorModeValue('gray.600', 'gray.400')}>
          Already have an account? <Button variant="link" colorScheme="teal" size="sm">Log In</Button>
        </Text>
      </Flex>
    </Flex>
  );
};
