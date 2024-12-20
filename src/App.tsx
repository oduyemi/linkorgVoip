import React from "react";
import { UserProvider } from "./usercontext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { Navbar } from "./navigation";
import Error404 from "./pages/Error404";
import GeneralShop from "./pages/Shop";
import YealinkStore from "./pages/YealinkStore";
import GrandstreamStore from "./pages/GrandstreamStore";
import FanvilStore from "./pages/FanvilStore";
import CiscoStore from "./pages/CiscoStore";
import ThePackages from "./pages/ThePackages";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import WishList from "./pages/Wishlist";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UserDashboard from "./pages/Dashboard";
import { CartProvider } from "./components/Cart/CartContext";
import { LogOut } from "./components/Logout";
import Checkout from "./pages/Checkout";
import Pay from "./pages/Pay";
import { MyCart } from "./pages/MyCart";

const stripePromise = loadStripe("pk_live_51QIQGdP8MdHf1E0aoaEz6vArMtkofrdwKbpF66LedwC7g1JW7M8q0awmMGEAluKp3mr7IBWYnMyuvKHSRJGW2P3000tJSAaUYj");

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <UserProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/faqs" element={<FAQ />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/packages" element={<ThePackages />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<UserDashboard />} />
                            <Route path="/dashboard/my-cart" element={<MyCart />} />
                            <Route path="/logout" element={<LogOut />} />
                            <Route path="/shop" element={<GeneralShop />} />
                            <Route path="/yealink" element={<YealinkStore />} />
                            <Route path="/grandstream" element={<GrandstreamStore />} />
                            <Route path="/fanvil" element={<FanvilStore />} />
                            <Route path="/cisco" element={<CiscoStore />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/wishlist" element={<WishList />} />
                            <Route path="/payment" element={
                                <Elements stripe={stripePromise}>
                                    <Pay />
                                </Elements>
                            } />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </UserProvider>
        </ChakraProvider>
    );
};

export default App;
