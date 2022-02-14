import { Box, Button, Flex, FormControl } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import RenderChat from "../../components/RenderChat/RenderChat";
import Send from "../../components/Send/Send";

const Chat = ({ socket }) => {
    const [message, setMessage] = useState("");
    const [currentTyping, setCurrentTyping] = useState("");
    const [chat, setChat] = useState([]);
    const navigate = useNavigate();
    const lastChatRef = useRef(null);

    useEffect(() => {
        // isMounted variable declared so that this error (Can't perform a React state update on an unmounted component.This is a no-op, but it indicates a memory leak in your application.To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.) will be handled
        let isMounted = true;
        socket.on("userconnected", ({ name }) => {
            if (isMounted) {
                // console.log(`${name} joined lobby `);
                const message = "connected";
                setChat((chat) => [...chat, { name, message }]);
            }
        });
        socket.on("userdisconnected", ({ name }) => {
            if (isMounted) {
                console.log(`${name} left lobby `);
                const message = "disconnected";
                setChat((chat) => [...chat, { name, message }]);
            }
        });
        socket.on("message", ({ name, message }) => {
            if (isMounted) {
                setChat((chat) => [...chat, { name, message }]);
                // To Scroll down the chat list
                if (lastChatRef.current !== null) {
                    // console.log(lastChatRef);
                    lastChatRef.current.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            }
        });
        socket.on("typing_start", ({ name }) => {
            if (isMounted) {
                setCurrentTyping(name);
            }
        });
        socket.on("typing_stop", () => {
            if (isMounted) {
                setCurrentTyping("");
            }
        });
        // console.log("HI");
        return () => {
            isMounted = false;
        };
    }, [socket]);

    useEffect(() => {
        const name = localStorage.getItem("user");
        socket.emit("userconnected", { name });
        // When user logs out
        return () => {
            socket.emit("userdisconnected", { name });
        };
    }, []);

    const login = () => {
        navigate("/", { replace: true });
    };

    const onTextChange = (e) => {
        const name = localStorage.getItem("user");
        socket.emit("typing_start", { name });
        setMessage(e.target.value);
    };

    const onMessageSubmit = (e) => {
        // e.preventDefault();
        const name = localStorage.getItem("user");
        socket.emit("message", { name, message });
        setMessage("");
    };

    return (
        <Flex
            h="100vh"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.50"
        >
            <Flex
                backgroundColor="gray.800"
                color="whiteAlpha.900"
                w="40rem"
                p="1rem"
                borderRadius="1rem"
                h="40rem"
                flexDirection="column"
                justifyItems="center"
            >
                {localStorage.getItem("user") === null ? (
                    <>
                        <Box
                            textAlign="center"
                            margin="auto 0 0 0"
                            color="red.400"
                            fontSize="2rem"
                        >
                            Login in first
                        </Box>
                        <Box margin="0 0 auto 0" textAlign="center">
                            <Button background="green.500" onClick={login}>
                                Login
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Header></Header>
                        <FormControl isRequired h="80%">
                            <Flex
                                border="1px"
                                backgroundColor="gray.700"
                                borderColor="whiteAlpha.500"
                                borderRadius="1rem"
                                marginY="1rem"
                                padding="1rem"
                                width="100%"
                                h="100%"
                                flexDirection="column"
                                overflowY="scroll"
                                className="scrollWindow"
                            >
                                <RenderChat
                                    chat={chat}
                                    lastChatRef={lastChatRef}
                                ></RenderChat>
                            </Flex>
                            {currentTyping && (
                                <Box
                                    position="absolute"
                                    top="1rem"
                                    textAlign="center"
                                    w="100%"
                                    backgroundColor="gray.900"
                                    opacity="60%"
                                >
                                    {currentTyping} is typing
                                </Box>
                            )}
                            <Send
                                message={message}
                                onTextChange={onTextChange}
                                onMessageSubmit={onMessageSubmit}
                            ></Send>
                        </FormControl>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default Chat;
