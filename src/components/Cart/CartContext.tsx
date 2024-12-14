import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
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
  const [cartCount, setCartCount] = useState<number>(0);
  const [userIP, setUserIP] = useState<string | null>(null);

  // Fetch user IP address for guest cart handling
  useEffect(() => {
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

  // Load cart from localStorage on component mount
  useEffect(() => {
    const cartKey = userIP ? `cart-${userIP}` : "cart-guest";
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));
    }
  }, [userIP]);

  // Function to add an item to the cart
  const addToCart = (product: CartItem) => {
    setCartItems((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProduct = updatedCart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        updatedCart.push(product);
      }

      // Update localStorage
      const cartKey = userIP ? `cart-${userIP}` : "cart-guest";
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      // Update cart count
      const newCartCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newCartCount);

      return updatedCart;
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);

      // Update localStorage
      const cartKey = userIP ? `cart-${userIP}` : "cart-guest";
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      // Update cart count
      const newCartCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newCartCount);

      return updatedCart;
    });
  };

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
