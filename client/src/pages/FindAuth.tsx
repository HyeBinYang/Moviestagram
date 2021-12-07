import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Auth.css";

function FindAuth() {
  const [email, setEmail] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <div id="authForm">
      <h1 className="authForm__title">Moviestagram</h1>
      <input
        onChange={inputEmail}
        className="authForm__email"
        type="text"
        placeholder="이메일을 입력해주세요"
        name="userName"
        value={email}
      />
      <button className="authForm__btn">아이디 찾기</button>
      <div className="authForm__signup">
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </div>
      <Link to="/auth/find">비밀번호를 까먹으셨나요?</Link>
    </div>
  );
}

export default FindAuth;
