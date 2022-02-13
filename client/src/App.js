import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:4000");

function App() {
    const [username, setUsername] = useState("");

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                username={username}
                                setUsername={setUsername}
                            ></Login>
                        }
                    ></Route>
                    <Route
                        path="/chat/:id"
                        element={<Chat socket={socket}></Chat>}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
