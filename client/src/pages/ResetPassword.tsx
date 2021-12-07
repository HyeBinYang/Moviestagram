import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Auth.css";

function ResetPassword() {
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [emptyPasswordConfirmError, setEmptyPasswordConfirmError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordNotEqualError, setPasswordNotEqualError] = useState(false);

  const inputPassword = useCallback(
    (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value }),
    [passwordForm],
  );

  const clearErrorMessage = useCallback(() => {
    setEmptyPasswordError(false);
    setEmptyPasswordConfirmError(false);
    setPasswordValidationError(false);
    setPasswordNotEqualError(false);
  }, []);

  const resetPassword = useCallback(() => {
    const { password, passwordConfirm } = passwordForm;

    clearErrorMessage();

    if (!password) {
      setEmptyPasswordError(true);
    } else if (!passwordConfirm) {
      setEmptyPasswordConfirmError(true);
    } else if (password.length < 8) {
      setPasswordValidationError(true);
    } else if (password !== passwordConfirm) {
      setPasswordNotEqualError(true);
    } else {
      axios
        .post("", passwordForm)
        .then(() => {})
        .catch((err) => {});
    }
  }, [passwordForm]);

  return (
    <div id="authForm">
      <h1 className="authForm__title">Moviestagram</h1>
      <input
        onChange={inputPassword}
        className="authForm__input"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        name="password"
        value={passwordForm.password}
      />
      {emptyPasswordError ? <p className="authForm__errormsg">비밀번호를 입력해주세요.</p> : null}
      {passwordValidationError ? <p className="authForm__errormsg">비밀번호가 유효하지 않습니다.</p> : null}
      <input
        onChange={inputPassword}
        className="authForm__input"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        name="passwordConfirm"
        value={passwordForm.passwordConfirm}
      />
      {emptyPasswordConfirmError ? <p className="authForm__errormsg">비밀번호 확인을 입력해주세요.</p> : null}
      {passwordNotEqualError ? <p className="authForm__errormsg">비밀번호를 동일하게 입력해주세요.</p> : null}
      <button onClick={resetPassword} className="authForm__btn">
        비밀번호 재설정
      </button>
      <div className="authForm__links">
        <Link to="/">로그인</Link>
        <Link to="/signup">가입하기</Link>
      </div>
      <div className="authForm__findlink">
        <Link to="/auth/find">아이디를 잊으셨나요?</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
