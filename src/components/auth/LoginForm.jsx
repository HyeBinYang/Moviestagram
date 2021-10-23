import React from "react";
import "./LoginForm.css";

function LoginForm() {
  return (
    <div id="loginform">
      <h1 className="loginform__title">MovieStagram</h1>
      <input className="loginform__id" type="text" placeholder="아이디" />
      <input className="loginform__password" type="password" placeholder="비밀번호" />
      <button className="loginform__btn">로그인</button>
      <div className="loginform__signup">
        계정이 없으신가요? <a href="#">가입하기</a>
      </div>
    </div>
  );
}

export default LoginForm;
