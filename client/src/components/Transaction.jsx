export default function Transaction({ transaction, deleteTransaction }) {
  const sign = transaction.cost < 0 ? "-" : "+";

  return (
    <div>
      <li
        className={transaction.cost < 0 ? "minus" : "plus"}
        key={transaction.id}
      >
        {transaction.text}{" "}
        <span>
          {sign}£{Math.abs(transaction.cost)}
        </span>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="delete-btn"
        >
          x
        </button>
      </li>
    </div>
  );
}
