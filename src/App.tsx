import React from "react";
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





const App: React.FC = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/packages" element={<ThePackages />} />
                    <Route path="/shop" element={<GeneralShop />} />
                    <Route path="/yealink" element={<YealinkStore />} />
                    <Route path="/grandstream" element={<GrandstreamStore />} />
                    <Route path="/fanvil" element={<FanvilStore />} />
                    <Route path="/cisco" element={<CiscoStore />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};



export default App;