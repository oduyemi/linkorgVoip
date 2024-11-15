import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { LoginForm } from "../components/Forms/LoginForm";




const Login: React.FC = () => {
    return(
        <Box>
            <LoginForm />
            <Footer />
        </Box>
    )
}

export default Login;