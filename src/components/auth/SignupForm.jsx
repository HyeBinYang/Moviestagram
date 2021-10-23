import React from "react";
import "./SignupForm.css";

function SignupForm() {
  return (
    <div id="signupform">
      <h1 className="signupform__title">MovieStagram</h1>
      <input className="signupform__id" type="text" placeholder="아이디" />
      <input className="signupform__email" type="text" placeholder="이메일 또는 휴대전화번호" />
      <input className="signupform__password" type="password" placeholder="비밀번호" />
      <input className="signupform__password" type="password" placeholder="비밀번호 확인" />
      <button className="signupform__btn">로그인</button>
      <div className="signupform__signup">
        계정이 있으신가요? <a href="#">로그인하러 가기</a>
      </div>
    </div>
  );
}

export default SignupForm;
