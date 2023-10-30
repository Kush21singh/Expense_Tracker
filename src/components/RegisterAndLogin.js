import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import the necessary Firebase authentication functions
import { initializeApp } from "firebase/app"; // Import the initializeApp function
import { getAuth } from "firebase/auth"; // Import the getAuth function
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDvev9F-NNqmr4SdRG_VcvQEjlLKAyaCWg",
  authDomain: "expensetracker-e1497.firebaseapp.com",
  projectId: "expensetracker-e1497",
  storageBucket: "expensetracker-e1497.appspot.com",
  messagingSenderId: "405268828223",
  appId: "1:405268828223:web:f949516fd4d35ac74ca88a"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase

const auth = getAuth(app);

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      // Sign In logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed in as:", user.email);
          history("/home");
        })
        .catch((error) => {
          alert(error.code);
        });
    } else {
      // Sign Up logic
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Registered as:", user.email);
          history("/home");
        })
        .catch((error) => {
          alert(error.code);
        });
    }
  };

  const handleToggle = () => {
    setLogin(!login);
  };

  return (
    <div className="App">
      <h1>{login ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <br />
        {login ? null : (
          <div>
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </label>
            <br />
          </div>
        )}
        <button>{login ? "Sign In" : "Sign Up"}</button>
      </form>
      {login && (
        <button onClick={handleToggle}>Forgot Password</button>
      )}
      <p>
        {login ? "Don't have an account? " : "Already have an account? "}
        <button onClick={handleToggle}>
          {login ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
}

export default RegisterAndLogin;
