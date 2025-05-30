#!/usr/bin/env node
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import color from "tiny-terminal-colors";

const args = process.argv.slice(2);


const createComponentDir = () => {
  const dir = path.join(process.cwd(), "src", "components");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const writeComponent = (name, content) => {
  const dir = createComponentDir();
  const filePath = path.join(dir, `${name}.js`);
  writeFileSync(filePath, content);
  console.log(color.green(`✅ ${name} component created at ${filePath}`));
};

const printHeader = (msg) => {
  console.log(color.bold(color.cyan(`\n✨ ${msg} ✨`)));
  console.log(color.yellow("⚠️  Make sure to install Tailwind CSS and Firebase in your project.\n"));
};

if (args[0] === "add") {
  switch (args[1]) {
    case "emailsignup":
      printHeader("Adding Email Signup Component with Tailwind CSS...");

      const signupComponent = `
"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation"; // Adjust the import based on your routing setup
import { auth } from "../firebase"; // Adjust the import path as necessary

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully!");
      redirect("/"); // Adjust redirect as needed
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default Signup;
      `.trim();

      writeComponent("Signup", signupComponent);
      break;

    case "emailsignin":
      printHeader("Adding Email Signin Component with Tailwind CSS...");

      const signinComponent = `
"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation"; // Adjust the import based on your routing setup
import { auth } from "../firebase"; // Adjust the import path as necessary

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Signed in successfully!");
      redirect("/"); // Adjust redirect as needed
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign In</h2>
        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default Signin;
      `.trim();

      writeComponent("Signin", signinComponent);
      break;

    default:
      console.log(color.red("Unknown command. Usage: npx quickfirebase add [emailsignup|emailsignin]"));
  }
} else {
  console.log(color.red("Usage: npx quickfirebase add [emailsignup|emailsignin]"));
}
