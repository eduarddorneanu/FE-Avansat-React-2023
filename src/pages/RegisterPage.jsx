import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../store/auth.reducer";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setRegisterError(error.message);
    }
  };

  return (
    <Center flexDirection="column" height="100vh">
      <Center
        flexDirection="column"
        p="20"
        bg="blue.100"
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading>Register</Heading>
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

        {registerError && <Text color="red">{registerError}</Text>}

        <Text
          color="blue"
          onClick={() => {
            navigate("/login");
          }}
        >
          Do you have an account?
        </Text>

        <Button mt="5" onClick={onRegister}>
          Register
        </Button>
      </Center>
    </Center>
  );
};

export default RegisterPage;
