import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../store/auth.reducer";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Center flexDirection="column" height="100vh">
      <Center
        flexDirection="column"
        p="20"
        bg="blue.100"
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            bg="white"
            type="email"
          />
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            bg="white"
            type="password"
          />
        </FormControl>

        <Button
          mt="5"
          onClick={() => {
            // POST /login
            if (email === "info@admin.com" && password === "12345") {
              localStorage.setItem("authToken", "dsdgsdfgdshgdhg");
              dispatch(setIsAuthenticated());
              navigate("/");
            }
          }}
        >
          Log in
        </Button>
      </Center>
    </Center>
  );
};

export default LoginPage;
