import { createContext, useState, useEffect, useContext } from "react";

// create our context that the user will use later
export const TransactionContext = createContext();

// here we create our provider (the thing that PROVIDES our CONTEXT to our app)
// We PROVIDE CONTEXT by wrapping all our components in THIS component
export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const res = await fetch(
      `https://expense-tracker-server1.onrender.com/transaction_list/${currentUser.id}`
    );

    const data = await res.json();
    setTransactions(data);
  }

  async function addTransaction(newTransaction) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const transactionWithUserID = {
      ...newTransaction,
      user_id: currentUser.id,
    };

    const res = await fetch(
      "https://expense-tracker-server1.onrender.com/transaction_list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionWithUserID),
      }
    );

    const addedTransaction = await res.json();
    setTransactions((prev) => [...prev, addedTransaction]);
    fetchTransactions();
  }

  async function deleteTransaction(id) {
    try {
      await fetch(
        `https://expense-tracker-server1.onrender.com/transaction_list/${id}`,
        {
          method: "DELETE",
        }
      );

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.log("Failed to delete transaction", error);
    }
    fetchTransactions();
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// create my own hook
export const useTransaction = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "Use this in a child to the transaction provider or else! "
    );
  }
  return context;
};
