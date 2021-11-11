import React, { useEffect } from "react";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  useEffect(() => {
    console.log("wewe");
  }, []);
  return (
    <>
      <SignupForm />
    </>
  );
}
