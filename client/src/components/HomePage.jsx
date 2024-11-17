import ButtonLink from "./ButtonLink";

export default function HomePage() {
  return (
    <div className="home-page ">
      <div className="nav-bar">
        <ButtonLink to="/sign-up">Sign Up</ButtonLink>

        <ButtonLink to="/log-in">Log In</ButtonLink>
      </div>
      <h1 className="home-style">Expense Tracker</h1>
      <p>Discover the ultimate tools</p>
      <p>for tracking your expense efficiency</p>
    </div>
  );
}
