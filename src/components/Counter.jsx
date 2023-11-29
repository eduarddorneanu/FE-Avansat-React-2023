import { useReducer } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";

const countReducer = (state, action) => {
  // action = { type, payload }
  switch (action.type) {
    case "increase":
      return state + 1;
    case "decrease":
      return state - 1;
    case "reset":
      return 0;
    case "multiply":
      return state * action.payload;
    default:
      throw new Error("This action type is not handled");
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(countReducer, 0);

  return (
    <VStack>
      <Text fontWeight="bold" fontSize="26" marginTop="5">
        Counter is: {state}
      </Text>
      <Button
        onClick={() => {
          dispatch({
            type: "increase",
          });
        }}
      >
        Increase
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "decrease",
          });
        }}
      >
        Decrease
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "reset",
          });
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "multiply",
            payload: 2,
          });
        }}
      >
        Multiply by 2
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "multiply",
            payload: 3,
          });
        }}
      >
        Multiply by 3
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: "asdafgdfgh",
          });
        }}
      >
        Throw Error
      </Button>
    </VStack>
  );
};

export default Counter;
