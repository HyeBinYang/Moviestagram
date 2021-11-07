import React from "react";
import { connect } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import {} from "../modules/auth";

function LoginContainer({ onLoginSuccess }) {
  return <LoginForm onLoginSuccess={onLoginSuccess} />;
}
