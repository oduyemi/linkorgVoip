import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { RegisterForm } from "../components/Auth/RegisterForm";




const Register: React.FC = () => {
    return(
        <Box>
            <RegisterForm />
            <Footer />
        </Box>
    )
}

export default Register;