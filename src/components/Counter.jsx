import { useEffect, useReducer, useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

const countReducer = (state, action) => {
  // action = { type, payload }
  switch (action.type) {
    case "setValue":
      return action.payload;
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
  const [state, dispatch] = useReducer(countReducer, "loading");
  const [highscore, setHighscore] = useState([]);

  useEffect(() => {
    if (!auth.currentUser || state === "loading") return;

    setDoc(doc(db, "counter", auth.currentUser.uid), {
      value: state,
    });
  }, [state]);

  const fetchUserCounter = async () => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "counter", userId));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "counter", userId), {
        value: 0,
      });
      dispatch({
        type: "setValue",
        payload: 0,
      });
    } else {
      dispatch({
        type: "setValue",
        payload: userDoc.data().value,
      });
    }
  };

  const fetchAllCounters = async () => {
    const counters = await getDocs(collection(db, "counter"));

    const highscore = [];
    counters.forEach((counter) => {
      highscore.push(counter.data().value);
    });

    setHighscore(highscore);
  };

  useEffect(() => {
    fetchUserCounter();
    fetchAllCounters();
  }, []);

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

      {highscore.length > 0 && (
        <VStack fontSize="24" fontWeight="bold">
          <Text>Highscore Table</Text>
          {highscore.map((score) => (
            <Text>{score}</Text>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default Counter;
