import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { FAQBanner } from "../components/FAQs/Banner";
import { VoipQuestions } from "../components/FAQs";
import { AdBox } from "../components/Home/AdBox";



const FAQ: React.FC = () => {
    return(
        <Box>
            <FAQBanner />
            <VoipQuestions />
            <AdBox backgroundImage={require("../assets/images/voip.jpg")} />
            <Footer />
        </Box>
    )
}

export default FAQ;