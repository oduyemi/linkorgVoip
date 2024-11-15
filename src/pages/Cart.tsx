import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import AddToCart from "../components/Cart/AddToCart"
import Cart from "../components/Cart/Cart";

const ToCart: React.FC = () => {
    return(
        <Box>
            <Cart />
        </Box>
    )
}

export default Cart;