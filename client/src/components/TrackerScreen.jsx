import ShowBalance from "./ShowBalance";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import { TransactionProvider } from "../context/TransactionContext";
import { useSignUp } from "../context/SignupContext";
import ButtonLink from "./ButtonLink";

export default function TrackerScreen() {
  const { signUp } = useSignUp();

  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const currentUser = signUp.find(
    (user) => user.username === storedUser?.username
  );

  const greetingName = currentUser ? currentUser.username : "Guest";

  return (
    <div className="tracker-screen">
      <TransactionProvider>
        <ButtonLink to="/log-in">Log Out</ButtonLink>
        <h1>Hello {greetingName}</h1>
        <ShowBalance />
        <TransactionList />
        <AddTransaction />
      </TransactionProvider>
    </div>
  );
}
