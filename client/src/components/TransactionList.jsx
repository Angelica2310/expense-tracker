import Transaction from "./Transaction";
import { useTransaction } from "../context/TransactionContext";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransaction();
  if (!transactions || transactions.length === 0) {
    return (
      <div>
        <p>⛔️ No transaction to display</p>
      </div>
    );
  }
  return (
    <div>
      ☞ Transaction history
      <ul className="transaction">
        {transactions.map((transaction, index) => (
          <Transaction
            key={transaction.id || index}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>
    </div>
  );
}
