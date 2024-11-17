import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../context/SignupContext";
import ButtonLink from "./ButtonLink";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const { addUser } = useSignUp();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const isDisabled = !form.username || !form.repeatPassword || error;

  async function handleAddUser(e) {
    e.preventDefault();

    if (error) {
      return; // Prevent submission if passwords do not match
    }

    const { username, password } = form;

    const newUser = {
      username,
      password,
    };
    await addUser(newUser);
    setForm({ username: "", password: "", repeatPassword: "" });

    navigate("/log-in");
  }

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "repeatPassword") {
      if (form.password !== e.target.value) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }

  return (
    <div>
      <div className="nav-bar">
        <ButtonLink to="/">Home</ButtonLink>
      </div>
      <div className="sign-up">
        <h2>Sign Up</h2>
        <form className="sign-up-form" onSubmit={handleAddUser}>
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

          <div className="input">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="repeat your password..."
              value={form.repeatPassword}
              onChange={handleInputChange}
            />
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              Password must match!!
            </p>
          )}
          <button
            type="submit"
            disabled={isDisabled}
            style={{
              backgroundColor: isDisabled ? "grey" : "3a5a40",
              cursor: isDisabled ? "not-allowed" : "pointer",
              color: "white",
            }}
          >
            Sign Up
          </button>
        </form>
        <p>
          Already signed up? <Link to="/log-in">Log in</Link>
        </p>
      </div>
    </div>
  );
}
