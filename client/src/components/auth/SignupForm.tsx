import React, { useCallback, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";
import { Link } from "react-router-dom";

interface SignupForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupForm() {
  const history = useHistory();
  const [signupForm, setSignupForm] = useState<SignupForm>({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [emptyIdError, setEmptyIdError] = useState(false);
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [emptyPasswordConfirmError, setEmptyPasswordConfirmError] = useState(false);

  const onChangeInput = useCallback(
    (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value }),
    [signupForm],
  );

  const clearmsg = useCallback(() => {
    setEmptyIdError(false);
    setEmptyEmailError(false);
    setEmptyPasswordError(false);
    setEmptyPasswordConfirmError(false);
  }, []);

  const register = useCallback(() => {
    clearmsg();

    if (!signupForm.userName) {
      setEmptyIdError(true);
    } else if (!signupForm.email) {
      setEmptyEmailError(true);
    } else if (!signupForm.password) {
      setEmptyPasswordError(true);
    } else if (!signupForm.passwordConfirm) {
      setEmptyPasswordConfirmError(true);
    } else {
      axios
        .post("/auth/register", signupForm)
        .then(() => history.push("/"))
        .catch((err) => {
          // 이미 존재하는 아이디
          // 패스워드 불일치 등등 처리
          console.log(err);
        });
    }
  }, [signupForm]);

  return (
    <div id="signupform">
      <h1 className="signupform__title">Moviestagram</h1>
      <input
        onChange={onChangeInput}
        className="signupform__id"
        type="text"
        placeholder="아이디"
        name="userName"
        value={signupForm.userName}
      />
      {emptyIdError ? <p className="signupForm__errormsg">아이디를 입력해주세요.</p> : null}
      <input
        onChange={onChangeInput}
        className="signupform__email"
        type="text"
        placeholder="이메일"
        name="email"
        value={signupForm.email}
      />
      {emptyEmailError ? <p className="signupForm__errormsg">이메일을 입력해주세요.</p> : null}
      <input
        onChange={onChangeInput}
        className="signupform__password"
        type="password"
        placeholder="비밀번호"
        name="password"
        value={signupForm.password}
      />
      {emptyPasswordError ? <p className="signupForm__errormsg">비밀번호를 입력해주세요.</p> : null}

      <input
        onChange={onChangeInput}
        className="signupform__password"
        type="password"
        placeholder="비밀번호 확인"
        name="passwordConfirm"
        value={signupForm.passwordConfirm}
      />
      {emptyPasswordConfirmError ? <p className="signupForm__errormsg">비밀번호 확인을 입력해주세요.</p> : null}
      <button onClick={register} className="signupform__btn">
        회원가입
      </button>
      <div className="signupform__signup">
        계정이 있으신가요? <Link to="/">로그인하러 가기</Link>
      </div>
    </div>
  );
}
