import React, { useCallback, useState } from "react";
import axios from "axios";
import "./AuthForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../modules/auth";

interface LoginForm {
  userName: string;
  password: string;
}

export default function LoginForm() {
  const authDispatch = useDispatch();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    userName: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const onChangeInput = useCallback(
    (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    },
    [loginForm],
  );

  const onLogin = useCallback(() => {
    axios
      .post("/auth/login", loginForm)
      .then(onLoginSuccess)
      .catch((err) => setLoginError(true));
  }, [loginForm]);

  const onSilentRefresh = useCallback(() => {
    axios
      .post("/auth/token")
      .then(onLoginSuccess)
      .catch((err) => console.log(err));
  }, []);

  const onLoginSuccess = useCallback((response) => {
    authDispatch(setUser(response));
    const { accessToken } = response.data;
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["token"] = accessToken;
    setTimeout(onSilentRefresh, 1000 * 60 * 60 * 24);
  }, []);

  return (
    <div id="authForm">
      <h1 className="authForm__title">Moviestagram</h1>
      <input
        onChange={onChangeInput}
        className="authForm__input"
        type="text"
        placeholder="아이디"
        name="userName"
        value={loginForm.userName}
      />
      <input
        onChange={onChangeInput}
        className="authForm__input"
        type="password"
        placeholder="비밀번호"
        name="password"
        value={loginForm.password}
      />
      {loginError ? <p className="authForm__errormsg">아이디 또는 비밀번호가 틀렸습니다.</p> : null}
      <button onClick={onLogin} className="authForm__btn">
        로그인
      </button>
      <div className="authForm__links">
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </div>
      <div className="authForm__findlink">
        <Link to="/auth/find/username">계정을 잊으셨나요?</Link>
      </div>
    </div>
  );
}
