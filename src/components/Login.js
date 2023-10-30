import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterAndLogin from "./RegisterAndLogin";
import HomeScreen from "./Home"; 
import ForgotPassword from "./ForgotPassword";

function PasswordLoginWithFirebase() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RegisterAndLogin />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/reset" element={<ForgotPassword />} />
                
            </Routes>
        </div>
    );
}

export default PasswordLoginWithFirebase;
