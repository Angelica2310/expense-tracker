import { useState } from "react";
import { useSignUp } from "../context/SignupContext";
import { Link, useNavigate } from "react-router-dom";
import ButtonLink from "./ButtonLink";

export default function LogIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();

    // Find a user with matching credentials
    const user = signUp.find(
      (user) =>
        user.username === form.username && user.password === form.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/tracker-screen");
    } else {
      setError("Incorrect");
    }
  }

  return (
    <div>
      <div className="nav-bar">
        <ButtonLink to="/">Home</ButtonLink>
      </div>
      <div className="log-in">
        <h2>Log In</h2>
        <form className="log-in-form" onSubmit={handleLogin}>
          <div className="input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="enter your name..."
              value={form.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password..."
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "0",
              }}
            >
              Incorrect username or password!!
            </p>
          )}
          <button type="submit">Log In</button>
        </form>
        <p>
          Don't have an account yet? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
