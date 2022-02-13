import { Box, Text } from "@chakra-ui/react";
import React, { useRef } from "react";

const RenderChat = ({ chat, lastChatRef }) => {
    return chat.map(({ name, message }, index) => {
        return (
            <Box
                backgroundColor={
                    name === localStorage.getItem("user")
                        ? "green.600"
                        : "blue.600"
                }
                maxWidth="fit-content"
                key={index}
                alignSelf={
                    name === localStorage.getItem("user") ? "end" : "start"
                }
                paddingX="0.4rem"
                paddingY="0.3rem"
                marginY="0.2rem"
                borderRadius="0.5rem"
            >
                <Text fontSize="md" ref={lastChatRef}>
                    <span>{message}</span>
                </Text>
            </Box>
        );
    });
};

export default RenderChat;
