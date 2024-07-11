import { useState } from "react";
import "./SignUpScreen.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignInScreen() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const authData = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      console.log(authData);
    } catch (error) {}
  };

  const signInFunction = async (e) => {
    e.preventDefault();
    try {
      const authData = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      console.log(authData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign In</h1>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <button onClick={signInFunction} type="submit">
          Sign In
        </button>
        <h4>
          <span className="signUpScreen__gray">New to Netflix? </span>
          <span className="signUpScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
