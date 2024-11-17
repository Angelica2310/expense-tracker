import { useState } from "react";
import { useTransaction } from "../context/TransactionContext";

export default function AddTransaction() {
  const [text, setText] = useState("");
  const [cost, setCost] = useState(0);
  const { transactions, addTransaction } = useTransaction();

  function handleAddTransaction(e) {
    e.preventDefault();

    const newTransaction = {
      text,
      cost: parseFloat(cost),
    };

    addTransaction(newTransaction);

    setCost(0);
    setText("");
  }
  return (
    <div className="add-transaction">
      ☞ Add new transaction
      <form onSubmit={handleAddTransaction}>
        <label htmlFor="text" style={{ fontSize: "14px" }}>
          Text
        </label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="enter name of transaction..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label htmlFor="amount" style={{ fontSize: "14px" }}>
          Amount{" "}
          <span style={{ fontSize: "11px" }}>
            (negative-expense, positive-income)
          </span>
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="enter amount..."
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
