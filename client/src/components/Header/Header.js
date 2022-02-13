import {
    Box,
    Button,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Header = () => {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    return (
        <Flex
            justifyContent="space-between"
            backgroundColor="gray.800"
            margin="0"
        >
            <Box>
                <Heading color="red.400" textAlign="center">
                    Messenger
                </Heading>
            </Box>
            <Box>
                <Menu>
                    <MenuButton
                        as={Button}
                        backgroundColor="gray.800"
                        _hover={{
                            backgroundColor: "gray.600",
                        }}
                        _active={{
                            backgroundColor: "gray.600",
                        }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </MenuButton>
                    <MenuList
                        width="2rem"
                        color="gray.800"
                        border="2px"
                        borderColor="red.500"
                    >
                        <MenuItem>
                            <Flex>
                                <Box>
                                    <i className="fa-solid fa-user"></i>
                                </Box>
                                <Box marginLeft="0.5rem">
                                    {localStorage.getItem("user")}
                                </Box>
                            </Flex>
                        </MenuItem>
                        <MenuDivider></MenuDivider>
                        <MenuItem>
                            <Flex>
                                <Box>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </Box>
                                <Box onClick={logOut} marginLeft="0.5rem">
                                    Log Out
                                </Box>
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
};

export default Header;
