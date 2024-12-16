import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface UserInformation {
  name: string;
  companyName: string;
  address: string;
  postcode: string;
  phone: string;
  email: string;
  country: string;
}

export const CheckoutForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    name: '',
    companyName: '',
    address: '',
    postcode: '',
    phone: '',
    email: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // To handle redirection after storing the details

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userInfo.name || !userInfo.companyName || !userInfo.address || !userInfo.postcode || !userInfo.phone || !userInfo.email || !userInfo.country) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    navigate('/payment');
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" className="blutext" textAlign="center" mb={6}>
        Checkout Form
      </Text>
      <FormControl mb={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="companyName">Company Name</FormLabel>
        <Input
          id="companyName"
          name="companyName"
          value={userInfo.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          id="address"
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="postcode">Postcode</FormLabel>
        <Input
          id="postcode"
          name="postcode"
          value={userInfo.postcode}
          onChange={handleInputChange}
          placeholder="Enter your postcode"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Input
          id="phone"
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="country">Country</FormLabel>
        <Input
          id="country"
          name="country"
          value={userInfo.country}
          onChange={handleInputChange}
          placeholder="Enter your country"
        />
      </FormControl>

      <Button
        colorScheme="orange"
        size="lg"
        onClick={handleSubmit}
        isLoading={loading}
        width="full"
      >
        Proceed to Payment
      </Button>
    </Box>
  );
};
