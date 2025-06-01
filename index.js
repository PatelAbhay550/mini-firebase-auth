#!/usr/bin/env node
<<<<<<< HEAD
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

const createFirebaseDir = () => {
  const dir = path.join(process.cwd(), "src");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const writeFile = (dir, name, content) => {
  const filePath = path.join(dir, name);
  writeFileSync(filePath, content);
  console.log(color.green(`✅ ${name} created at ${filePath}`));
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
// ... same as before ...
      `.trim();
      writeFile(createComponentDir(), "Signup.js", signupComponent);
      break;

    case "emailsignin":
      printHeader("Adding Email Signin Component with Tailwind CSS...");
      const signinComponent = `
// ... same as before ...
      `.trim();
      writeFile(createComponentDir(), "Signin.js", signinComponent);
      break;

    case "firebaseconfig":
      printHeader("Adding Firebase Configuration File...");
      const firebaseConfig = `
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
      `.trim();
      writeFile(createFirebaseDir(), "firebase.js", firebaseConfig);
      break;

    case "googlesignin":
      printHeader("Adding Google Signin Component with Tailwind CSS...");
      const googleSigninComponent = `
// src/components/GoogleSignin.js
"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation"; // Adjust if necessary
import { auth } from "../firebase";

const GoogleSignin = () => {
  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      redirect("/");
    } catch (err) {
      console.error(err);
      alert("Google Signin failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoogleSignin}
        className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.3 33.3 29 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 6.4 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.5 16.2 19 14 24 14c3.1 0 5.9 1.2 8 3.1l6-6C34.6 6.4 29.7 4 24 4c-7.4 0-13.7 4-17.7 10.1z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.1C28.9 35.9 26.6 36 24 36c-5 0-9.3-2.7-11.7-6.7l-6.6 5.1C8.3 40 15.6 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-4.3 5.3-7.3 5.3-2.6 0-5-.9-6.9-2.5l-6.6 5.1C17.1 40.4 20.3 44 24 44c8 0 14.7-6.1 16.2-13.9.2-1.1.4-2.3.4-3.5 0-1.2-.1-2.4-.4-3.5z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignin;
      `.trim();
      writeFile(createComponentDir(), "GoogleSignin.js", googleSigninComponent);
      break;

    default:
      console.log(color.red("Unknown command. Usage: npx quickfirebase add [emailsignup|emailsignin|firebaseconfig|googlesignin]"));
  }
} else {
  console.log(color.red("Usage: npx quickfirebase add [emailsignup|emailsignin|firebaseconfig|googlesignin]"));
}
=======
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
>>>>>>> 649493763a184d80f22016e2c7b067529b7165b9
