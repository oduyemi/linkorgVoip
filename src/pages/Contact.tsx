import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { ContactBanner } from "../components/Contact/Banner";



const Contact: React.FC = () => {
    return(
        <Box>
            <ContactBanner />
            <Footer />
        </Box>
    )
}

export default Contact;