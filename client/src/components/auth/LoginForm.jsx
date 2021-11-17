import React, { useCallback, useReducer } from "react";
import axios from "axios";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../modules/auth";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const initialLoginFormState = {
  userName: "",
  password: "",
};

export default function LoginForm() {
  const authDispatch = useDispatch();
  const [loginFormState, dispatch] = useReducer(reducer, initialLoginFormState);
  const { userName, password } = loginFormState;

  const onChangeInput = useCallback((e) => dispatch(e.target), []);

  const onLogin = useCallback(() => {
    axios
      .post("/auth/login", loginFormState)
      .then(onLoginSuccess)
      .catch((err) => console.log(err));
  }, [loginFormState]);

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
    <div id="loginform">
      <h1 className="loginform__title">Moviestagram</h1>
      <input onChange={onChangeInput} className="loginform__id" type="text" placeholder="아이디" name="userName" value={userName} />
      <input onChange={onChangeInput} className="loginform__password" type="password" placeholder="비밀번호" name="password" value={password} />
      <button onClick={onLogin} className="loginform__btn">
        로그인
      </button>
      <div className="loginform__signup">
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </div>
    </div>
  );
}
