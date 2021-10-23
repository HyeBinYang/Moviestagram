import React from "react";
import "./App.css";

// Components
import Navbar from "./components/common/Navbar";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

function App() {
  return (
    <div>
      <Navbar />
      <SignupForm />
    </div>
  );
}

export default App;
