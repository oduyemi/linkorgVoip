import React from 'react';
import { CartProvider } from '../components/Cart/CartContext';
import { Cart } from '../components/Cart/Cart';

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};

export default CartPage;
