import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { Link, useHistory } from "react-router-dom";

export default function LoginForm() {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});

  const handleUserId = (e) => setUserId(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const onLogin = () => {
    axios
      .post("/auth/login", { userId, password })
      .then(onLoginSuccess)
      .catch((err) => console.log(err));
  };

  const onSilentRefresh = () => {
    axios
      .post("/auth/token", formData)
      .then(onLoginSuccess)
      .catch((err) => console.log(err));
  };

  const onLoginSuccess = (response) => {
    setFormData({ userId, password });
    const { accessToken } = response.data;
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["token"] = accessToken;

    setTimeout(onSilentRefresh, 1000 * 60 * 60 * 24);
  };

  return (
    <div id="loginform">
      <h1 className="loginform__title">Moviestagram</h1>
      <input onChange={handleUserId} className="loginform__id" type="text" placeholder="아이디" />
      <input onChange={handlePassword} className="loginform__password" type="password" placeholder="비밀번호" />
      <button onClick={onLogin} className="loginform__btn">
        로그인
      </button>
      <div className="loginform__signup">
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </div>
    </div>
  );
}
