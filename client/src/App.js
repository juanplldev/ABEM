// Dependencies
import React from "react";
import {Route, Routes} from "react-router-dom";
// Files
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/forgot" element={<ForgotPassword/>} />
        <Route exact path="/reset/:id" element={<ResetPassword/>} />
      </Routes>
    </React.Fragment>
  );
}


export default App;