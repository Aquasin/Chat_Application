import { Box, Text } from "@chakra-ui/react";
import React from "react";

const RenderChat = ({ chat, lastChatRef }) => {
    return chat.map(({ name, message }, index) => {
        if (message === "connected" || message === "disconnected") {
            return (
                <Box
                    backgroundColor="red.400"
                    maxWidth="fit-content"
                    key={index}
                    alignSelf="center"
                    paddingX="0.4rem"
                    paddingY="0.3rem"
                    marginY="0.2rem"
                    borderRadius="0.5rem"
                >
                    <Text fontSize="md" ref={lastChatRef}>
                        {name} has {message}
                    </Text>
                </Box>
            );
        } else {
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
                        {message}
                    </Text>
                </Box>
            );
        }
    });
};

export default RenderChat;
