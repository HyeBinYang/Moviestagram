import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleUserId = (e) => setUserId(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordConfirm(e.target.value);

  const register = () => {
    const formData = {
      userId,
      email,
      password,
      passwordConfirm,
    };
    axios
      .post("/auth/register", formData)
      .then(() => history.push("/login"))
      .catch((err) => {
        // 이미 존재하는 아이디
        // 패스워드 불일치 등등 처리
        console.log(err);
      });
  };

  return (
    <div id="signupform">
      <h1 className="signupform__title">Moviestagram</h1>
      <input onChange={handleUserId} className="signupform__id" type="text" placeholder="아이디" />
      <input onChange={handleEmail} className="signupform__email" type="text" placeholder="이메일 또는 휴대전화번호" />
      <input onChange={handlePassword} className="signupform__password" type="password" placeholder="비밀번호" />
      <input onChange={handlePasswordConfirm} className="signupform__password" type="password" placeholder="비밀번호 확인" />
      <button onClick={register} className="signupform__btn">
        회원가입
      </button>
      <div className="signupform__signup">
        계정이 있으신가요? <Link to="/login">로그인하러 가기</Link>
      </div>
    </div>
  );
}
