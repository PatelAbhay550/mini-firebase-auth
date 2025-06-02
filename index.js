#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import color from "tiny-terminal-colors";

const args = process.argv.slice(2);

// Create /src/components
const createComponentDir = () => {
  const dir = path.join(process.cwd(), "src", "components");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// Create /lib for firebase.js
const createFirebaseDir = () => {
  const dir = path.join(process.cwd(), "lib");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// Write file with message
const writeFile = (dir, name, content) => {
  const filePath = path.join(dir, name);
  if (existsSync(filePath)) {
    console.log(color.yellow(`⚠️  Skipped: ${name} already exists at ${filePath}`));
    return;
  }
  writeFileSync(filePath, content);
  console.log(color.green(`✅ ${name} created at ${filePath}`));
};

// Styled header
const printHeader = (msg) => {
  console.log(color.bold(color.cyan(`\n✨ ${msg} ✨`)));
  console.log(color.yellow("⚠️  Make sure to install Tailwind CSS and Firebase in your project.\n"));
};

// CLI logic
if (args[0] === "add") {
  switch (args[1]) {
    case "emailsignup":
      printHeader("Adding Email Signup Component with Tailwind CSS...");
      const signupComponent = `
// src/components/Signup.js
"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { redirect } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      redirect("/");
    } catch (err) {
      console.error(err);
      setError("Signup failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <button type="submit" disabled={loading} className={\`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition \${loading ? "opacity-50 cursor-not-allowed" : ""}\`}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign In</a></p>
      </div>
    </div>
  );
};

export default Signup;
      `.trim();
      writeFile(createComponentDir(), "Signup.js", signupComponent);
      break;

    case "emailsignin":
      printHeader("Adding Email Signin Component with Tailwind CSS...");
      const signinComponent = `
// src/components/Signin.js
"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { redirect } from "next/navigation";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect("/");
    } catch (err) {
      console.error(err);
      setError("Signin failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <button type="submit" disabled={loading} className={\`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition \${loading ? "opacity-50 cursor-not-allowed" : ""}\`}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Signin;
      `.trim();
      writeFile(createComponentDir(), "Signin.js", signinComponent);
      break;

    case "firebaseconfig":
      printHeader("Adding Firebase Configuration File...");
      const firebaseConfig = `
// lib/firebase.js
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
    case "env":
      printHeader("Adding Sample env file in root folder...")
      printHeader("Remember to fill in your Firebase credentials in .env.local file");
      const env=`
      NEXT_PUBLIC_FIREBASE_APP_ID=
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=
      NEXT_PUBLIC_FIREBASE_API_KEY=
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
      `.trim()
      writeFile(process.cwd(), ".env.local", env);
      break;
    case "googlesignin":
      printHeader("Adding Google Signin Component with Tailwind CSS...");
      const googleSigninComponent = `
// src/components/GoogleSignin.js
"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { redirect } from "next/navigation";

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
      <button onClick={handleGoogleSignin} className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.3 33.3 29 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 6.4 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.2 19 14 24 14c3.1 0 5.9 1.2 8 3.1l6-6C34.6 6.4 29.7 4 24 4c-7.4 0-13.7 4-17.7 10.1z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.1C28.9 35.9 26.6 36 24 36c-5 0-9.3-2.7-11.7-6.7l-6.6 5.1C8.3 40 15.6 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-4.3 5.3-7.3 5.3-2.6 0-5-.9-6.9-2.5l-6.6 5.1C17.1 40.4 20.3 44 24 44c8 0 14.7-6.1 16.2-13.9.2-1.1.4-2.3.4-3.5 0-1.2-.1-2.4-.4-3.5z"/>
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
      case "phoneauth":
      printHeader("Adding Phone Authentication Component with Tailwind CSS...");
      const phoneAuthComponent = `
// src/components/PhoneAuth.js
"use client";
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Ensure you have firebase.js in lib folder
import { redirect } from "next/navigation";
const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCHA solved, ready to send code.");
      },
    }, auth);
  }
  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setupRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("Verification code sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send verification code: " + err.message);
    }
    setLoading(false);
  }
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!confirmationResult) {
        throw new Error("No confirmation result available. Please send the verification code first.");
      }
      await confirmationResult.confirm(verificationCode);
      redirect("/");
    } catch (err) {
      console.error(err);
      setError("Verification failed: " + err.message);
    }
    setLoading(false);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Phone Authentication</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!confirmationResult ? (
          <form onSubmit={handleSendCode}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
              <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <button type="submit" disabled={loading} className={\`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition \${loading ? "opacity-50 cursor-not-allowed" : ""}\`}>
              {loading ? "Sending code..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium mb-2">Verification Code</label>
              <input type="text" id="code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <button type="submit" disabled={loading} className={\`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition \${loading ? "opacity-50 cursor-not-allowed" : ""}\`}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};
export default PhoneAuth;
      `.trim();
      writeFile(createComponentDir(), "PhoneAuth.js", phoneAuthComponent);
      break;

    default:
      console.log(color.red("Unknown command. Usage: npx quickfirebase add [emailsignup|emailsignin|firebaseconfig|googlesignin]"));
  }
} else {
  console.log(color.red("Usage: npx quickfirebase add [emailsignup|emailsignin|firebaseconfig|googlesignin]"));
}
