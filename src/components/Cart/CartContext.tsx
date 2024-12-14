import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userIP, setUserIP] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user's IP address
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setUserIP(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    
    fetchIP();
  }, []);

  useEffect(() => {
    if (userIP) {
      // Retrieve cart items from localStorage using the IP address as key
      const storedCart = localStorage.getItem(`cart-${userIP}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [userIP]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProduct = updatedCart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        updatedCart.push(product);
      }

      // Save updated cart to localStorage using the IP address as key
      if (userIP) {
        localStorage.setItem(`cart-${userIP}`, JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);

      // Save updated cart to localStorage using the IP address as key
      if (userIP) {
        localStorage.setItem(`cart-${userIP}`, JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
