import { Box } from "@chakra-ui/react";
import React from "react";
import { PageNotFound } from "../components/PageNotFound";



const Error404: React.FC = () => {
    return(
        <Box>
            <PageNotFound />
        </Box>
    )
}

export default Error404;