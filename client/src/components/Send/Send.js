import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";

const Send = ({ message, onTextChange, onMessageSubmit }) => {
    return (
        <Flex flexDirection="row">
            <Input
                type="text"
                name="message"
                onChange={(e) => onTextChange(e)}
                value={message}
                mr="1rem"
                onKeyPress={(event) => {
                    event.key === "Enter" && onMessageSubmit();
                }}
            ></Input>
            <Button
                backgroundColor="green.500"
                _hover={{
                    backgroundColor: "green.300",
                }}
                onClick={onMessageSubmit}
                fontSize={{ base: "0.7rem", md: "1rem" }}
            >
                Send Message
            </Button>
        </Flex>
    );
};

export default Send;
