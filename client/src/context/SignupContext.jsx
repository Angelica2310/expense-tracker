import { createContext, useEffect, useState, useContext } from "react";

export const SignUpContext = createContext();

export function SignUpProvider({ children }) {
  const [signUp, setSignUp] = useState([]);

  useEffect(() => {
    fetchSignUp();
  }, []);

  async function fetchSignUp() {
    const res = await fetch(
      "https://expense-tracker-server1.onrender.com/signup_list"
    );
    const data = await res.json();
    setSignUp(data);
  }

  async function addUser(newUser) {
    const res = await fetch(
      "https://expense-tracker-server1.onrender.com/signup_list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    const addedUser = await res.json();
    setSignUp((prev) => [...prev, addedUser]);
    fetchSignUp();
  }

  return (
    <SignUpContext.Provider value={{ signUp, addUser }}>
      {children}{" "}
    </SignUpContext.Provider>
  );
}

export const useSignUp = () => {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error(
      "useSignUp must be used within a SignUpProvider. Wrap your component with SignUpProvider!"
    );
  }
  return context;
};
