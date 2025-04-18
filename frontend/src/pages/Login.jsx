import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { auth } from "./userAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      if (currentState === "Login") {
        // Login functionality
        await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in");
        // Redirect to main page after successful login
        navigate("/main");  // Adjust "/main" to your actual main page route
      } else {
        // Sign-up functionality
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User signed up");
        // Redirect to login page after successful sign-up
        navigate("/login");  // Adjust "/login" to your actual login page route
      }
    } catch (err) {
      console.error("❌ Auth error:", err.message);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
