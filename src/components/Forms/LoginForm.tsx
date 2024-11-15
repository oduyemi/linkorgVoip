// src/pages/Login.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  VStack,
  Divider,
  Text,
  Link,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Example: Replace with your authentication logic
    if (email === 'test@example.com' && password === 'password') {
      toast({
        title: 'Login Successful',
        description: 'You have logged in successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <VStack
      spacing={8}
      align="center"
      justify="center"
      height="100vh"
      bgGradient="linear(to-r, #010156, #e65d0f)"
    >
      <Box
        width="100%"
        maxW="400px"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        borderColor="#e65d0f"
        transition="transform 0.3s ease-in-out"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h2" mb={6} textAlign="center" color="#010156">
            Login to Your Account
          </Heading>

          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              <Button
                colorScheme="orange"
                type="submit"
                width="full"
                isLoading={loading}
                loadingText="Logging in..."
                _hover={{ bg: '#e65d0f' }}
                _active={{ bg: '#e65d0f' }}
              >
                Login
              </Button>
            </Stack>
          </form>

          <HStack justify="space-between" mt={4}>
            <Link color="#e65d0f" href="#">
              Forgot Password?
            </Link>
            <Link color="#010156" style={{fontSize:"12px"}} href="/register">
              Don't have an account? Sign Up
            </Link>
          </HStack>

          <Divider my={6} />

          <Text fontSize="lg" textAlign="center" mb={2}>
            Or login with
          </Text>

          <HStack justify="center" spacing={4}>
            <IconButton
              aria-label="Google login"
              icon={<FaGoogle />}
              size="lg"
              colorScheme="red"
              variant="outline"
              isRound
            />
            <IconButton
              aria-label="Facebook login"
              icon={<FaFacebook />}
              size="lg"
              colorScheme="facebook"
              variant="outline"
              isRound
            />
          </HStack>
        </motion.div>
      </Box>
    </VStack>
  );
};

