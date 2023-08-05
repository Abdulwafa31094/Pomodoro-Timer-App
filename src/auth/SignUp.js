import React, { useState } from "react";
// import firebase from "../firebaseConfig";
import {auth} from '../firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const SignUp = ({ handleSignUp, setShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

     createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential)=>{
        console.log(userCredential);
        handleSignUp(email, password);
        setError(null);
      })
      .catch((error)=>{
        console.log(error);
        setError(error.message);
      });

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignUpSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button type="submit" className="block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to='/' className="text-blue-500 font-semibold focus:outline-none hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

