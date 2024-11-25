import React, { useState, useContext } from 'react';
import { UserContext } from '../../usercontext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  VStack,
  Divider,
  Text,
  Link,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const { handleLogin, flashMessage } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await handleLogin(formData.email, formData.password);
    setLoading(false);

    if (success) {
      const requestedPath = localStorage.getItem('requestedPath');
      navigate(requestedPath || '/dashboard');
    }
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

          {flashMessage && (
            <Alert status={flashMessage.type} mb={4}>
              <AlertIcon />
              <AlertTitle>{flashMessage.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
              <AlertDescription>{flashMessage.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="Email address"
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                    _focus={{
                      borderColor: '#e65d0f',
                      boxShadow: '0 0 0 1px #e65d0f',
                    }}
                  />
                  <InputRightElement>
                    <Button size="sm" onClick={toggleShowPassword}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
            <Link color="#010156" fontSize="12px" href="/register">
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
