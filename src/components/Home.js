import React from "react";
import { signOut } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import './Home.css';

function HomeScreen() {
  const history = useNavigate();

  const handleClick = () => {
    signOut(database)
      .then(() => {
        history("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  }

  return (
    <div className="home-container">
      <h1>Welcome to Expense Tracker!!!</h1>
      <p>
        Your Profile is Incomplete. Complete Now{" "}
        <button onClick={() => history("/profile")}>Complete Now</button>
      </p>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
}

export default HomeScreen;
