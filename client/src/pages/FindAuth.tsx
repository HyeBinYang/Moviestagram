import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Auth.css";

function FindAuth() {
  const [email, setEmail] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [notEmailDuplicationError, setNotEmailDuplicationError] = useState(false);

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setEmptyEmailError(false);
    setEmailValidationError(false);
    setNotEmailDuplicationError(false);
  }, []);

  const searchID = useCallback(() => {
    const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    clearErrorMessage();

    if (!email) {
      setEmptyEmailError(true);
    } else if (!regEmail.test(email)) {
      setEmailValidationError(true);
    } else {
      // 해당 이메일이 존재하면 이메일로 아이디 보낸다.
      axios
        .post("")
        .then(() => {})
        .catch((err) => {
          const errorData = err.response.data;

          if (errorData.includes("email")) {
            setNotEmailDuplicationError(true);
          }
        });
    }
  }, [email]);

  return (
    <div id="authForm">
      <h1 className="authForm__title">Moviestagram</h1>
      <input
        onChange={inputEmail}
        className="authForm__input"
        type="text"
        placeholder="이메일을 입력해주세요"
        name="userName"
        value={email}
      />
      {emptyEmailError ? <p className="authForm__errormsg">이메일을 입력해주세요.</p> : null}
      {emailValidationError ? <p className="authForm__errormsg">이메일이 유효하지 않습니다.</p> : null}
      {notEmailDuplicationError ? <p className="authForm__errormsg">가입되어있지 않은 이메일입니다.</p> : null}
      <button onClick={searchID} className="authForm__btn">
        아이디 찾기
      </button>
      <div className="authForm__links">
        <Link to="/">로그인</Link>
        <Link to="/signup">가입하기</Link>
      </div>
      <div className="authForm__findlink">
        <Link to="/auth/reset">비밀번호를 잊으셨나요?</Link>
      </div>
    </div>
  );
}

export default FindAuth;
