import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { Navbar } from "./navigation";





const App: React.FC = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="*" element={<Error404 />} /> */}
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};



export default App;