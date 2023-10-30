import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import Login from './components/Login';
import HomeScreen from './components/Home';
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
