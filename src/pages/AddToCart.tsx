import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import AddToCart from "../components/Cart/AddToCart"

const ToCart: React.FC = () => {
    return(
        <Box>
            <Box>
                <Heading className="text-center my-5 blutext">Product List</Heading>
            </Box>
            <AddToCart />
        </Box>
    )
}

export default ToCart;