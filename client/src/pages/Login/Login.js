import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const Login = ({ username, setUsername }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUsername(localStorage.getItem("user"));
            navigate(`/chat/${localStorage.getItem("user")}`, {
                replace: true,
            });
        }
    }, []);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem("user", username);
        navigate(`/chat/${username}`, { replace: true });
    };

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            h="100vh"
            backgroundColor="gray.50"
        >
            <Box
                backgroundColor="gray.800"
                color="whiteAlpha.900"
                paddingY="3rem"
                paddingX="5rem"
                borderRadius="1rem"
            >
                <Box
                    fontSize="4rem"
                    color="red.400"
                    marginY="1rem"
                    textAlign="center"
                >
                    Login
                </Box>
                <FormControl isRequired>
                    <FormLabel htmlFor="name" fontSize="1rem">
                        Name
                    </FormLabel>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={handleChange}
                    ></Input>
                    <Button
                        backgroundColor="blue.600"
                        _hover={{ background: "gray.700" }}
                        textAlign="center"
                        my="1rem"
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </FormControl>
            </Box>
        </Flex>
    );
};

export default Login;
