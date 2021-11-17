import React, { useCallback, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";
import { Link } from "react-router-dom";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const initialSignupFormState = {
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function SignupForm() {
  const history = useHistory();
  const [signupFormState, dispatch] = useReducer(reducer, initialSignupFormState);
  const { userName, email, password, passwordConfirm } = signupFormState;

  const onChangeInput = useCallback((e) => dispatch(e.target), []);

  const register = useCallback(() => {
    axios
      .post("/auth/register", signupFormState)
      .then(() => history.push("/"))
      .catch((err) => {
        // 이미 존재하는 아이디
        // 패스워드 불일치 등등 처리
        console.log(err);
      });
  }, []);

  return (
    <div id="signupform">
      <h1 className="signupform__title">Moviestagram</h1>
      <input onChange={onChangeInput} className="signupform__id" type="text" placeholder="아이디" name="userName" value={userName} />
      <input onChange={onChangeInput} className="signupform__email" type="text" placeholder="이메일 또는 휴대전화번호" name="email" value={email} />
      <input onChange={onChangeInput} className="signupform__password" type="password" placeholder="비밀번호" name="password" value={password} />
      <input
        onChange={onChangeInput}
        className="signupform__password"
        type="password"
        placeholder="비밀번호 확인"
        name="passwordConfirm"
        value={passwordConfirm}
      />
      <button onClick={register} className="signupform__btn">
        회원가입
      </button>
      <div className="signupform__signup">
        계정이 있으신가요? <Link to="/">로그인하러 가기</Link>
      </div>
    </div>
  );
}
