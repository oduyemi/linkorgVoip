// src/pages/Register.tsx
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
  HStack,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Example: Replace with your registration logic
    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    // Simulate successful registration
    toast({
      title: 'Registration Successful',
      description: 'You have registered successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setLoading(false);
  };

  return (
    <VStack
      spacing={8}
      align="center"
      justify="center"
      bgGradient="linear(to-r, #010156, #e65d0f)"
      minHeight="80vh"
      paddingTop="5vh"
    >
      <Box
        width="100%"
        maxW="600px"  
        className="mb-5"
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
            Create Your Account
          </Heading>

          <form onSubmit={handleRegister}>
            <Stack spacing={4}>
              {/* First Name */}
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              {/* Last Name */}
              <FormControl isRequired>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              {/* Email */}
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

              {/* Phone */}
              <FormControl isRequired>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              {/* Address */}
              <FormControl isRequired>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              {/* Password */}
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

              {/* Confirm Password */}
              <FormControl isRequired>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  _focus={{
                    borderColor: '#e65d0f',
                    boxShadow: '0 0 0 1px #e65d0f',
                  }}
                />
              </FormControl>

              {/* Register Button */}
              <Button
                colorScheme="orange"
                type="submit"
                width="full"
                isLoading={loading}
                loadingText="Registering..."
                _hover={{ bg: '#e65d0f' }}
                _active={{ bg: '#e65d0f' }}
              >
                Register
              </Button>
            </Stack>
          </form>

          <HStack justify="space-between" mt={4}>
            <Link color="#010156" style={{fontSize: "12px" }} href="/login">
              Already have an account? Login
            </Link>
          </HStack>

          <Divider my={6} />

          <Text fontSize="lg" textAlign="center" mb={2}>
            Or register with
          </Text>

          <HStack justify="center" spacing={4}>
            <IconButton
              aria-label="Google register"
              icon={<FaGoogle />}
              size="lg"
              colorScheme="red"
              variant="outline"
              isRound
            />
            <IconButton
              aria-label="Facebook register"
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