import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { ContactBanner } from "../components/Contact/Banner";
import { ContactUs } from "../components/Contact";
import { AdBox } from "../components/Home/AdBox";



const Contact: React.FC = () => {
    return(
        <Box>
            <ContactBanner />
            <ContactUs />
            <AdBox backgroundImage={require("../assets/images/voip.jpg")} />
            <Footer />
        </Box>
    )
}

export default Contact;