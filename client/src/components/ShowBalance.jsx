import { useTransaction } from "../context/TransactionContext";

export default function ShowBalance() {
  const { transactions } = useTransaction();

  const { total, income, expense } = transactions.reduce(
    (acc, transaction) => {
      const cost = parseFloat(transaction.cost); // Ensure cost is a number
      acc.total += cost;
      if (cost > 0) acc.income += cost;
      if (cost < 0) acc.expense += cost;
      return acc;
    },
    { total: 0, income: 0, expense: 0 } // Initial accumulator values
  );

  return (
    <div className="show-balance">
      <h2>Balance: £{total.toFixed(2)}</h2>
      <div className="income-expense">
        <div>
          <h4>Income</h4>
          <p className="money plus">{income.toFixed(2)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
