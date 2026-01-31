[![npm](https://img.shields.io/npm/d18m/mini-firebase-auth?logo=npm&labelColor=black)](https://www.npmjs.com/package/mini-firebase-auth)
[![NPM License](https://img.shields.io/npm/l/mini-firebase-auth?color=blue)](https://github.com/PatelAbhay550/mini-firebase-auth/blob/main/LICENSE)
[![GitHub Streak](https://streak-stats.demolab.com?user=Patelabhay550&theme=dark)](https://git.io/streak-stats)
# mini-firebase-auth

A simple CLI tool to quickly add **Firebase Email Signup**, **Email Signin**, **Google Signin**, **Phone Auth**, **FirebaseConfig**, and **env** components (with Tailwind CSS) to your Next.js or React project.

---

## 🚀 Installation

```bash
npx mini-firebase-auth add emailsignup
npx mini-firebase-auth add emailsignin
npx mini-firebase-auth add googlesignin
npx mini-firebase-auth add phoneauth
npx mini-firebase-auth add firebaseconfig
npx mini-firebase-auth add env
```

---

## 📦 Usage

After running the above commands, the following components will be added to your directory:

```
src/components/
  ├── Signup.js
  ├── Signin.js
  ├── GoogleSignin.js
  └── PhoneAuth.js
lib/
  └── firebase.js
[root]/
  └── .env.local
```

You can import and use these components in your React or Next.js application as needed.

---

## 🛠️ Customize

You can customize the components by editing the `Signup.js`, `Signin.js`, `GoogleSignin.js`, and `PhoneAuth.js` files in the `src/components/` directory and `firebase.js` file in the `lib/` directory and `.env.local` file in the root directory. Tailwind CSS classes are used for styling, so you can easily adjust the design to fit your needs.  Update redirect paths and authentication logic as required for your project.

---

## 📦 Requirements

- Node.js (>= 14.x)
- Firebase project setup
- Tailwind CSS installed

---

## 📄 License

MIT License

