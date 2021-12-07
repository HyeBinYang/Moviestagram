import React, { useCallback, useState } from "react";
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

  // 입력창에 값을 입력 안했을때 에러
  const [emptyIdError, setEmptyIdError] = useState(false);
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [emptyPasswordConfirmError, setEmptyPasswordConfirmError] = useState(false);

  // 아이디, 이메일, 비밀번호 유효성 에러
  const [idValidationError, setIdValidationError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordNotEqualError, setPasswordNotEqualError] = useState(false);

  // 아이디, 이메일 중복 에러
  const [idDuplicationError, setIdDuplicationError] = useState(false);
  const [emailDuplicationError, setEmailDuplicationError] = useState(false);

  const onChangeInput = useCallback(
    (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value }),
    [signupForm],
  );

  const clearErrorMsg = useCallback(() => {
    setEmptyIdError(false);
    setEmptyEmailError(false);
    setEmptyPasswordError(false);
    setEmptyPasswordConfirmError(false);
    setIdValidationError(false);
    setEmailValidationError(false);
    setPasswordValidationError(false);
    setPasswordNotEqualError(false);
    setIdDuplicationError(false);
    setEmailDuplicationError(false);
  }, []);

  const checkValidation = useCallback(() => {
    const { userName, email, password, passwordConfirm } = signupForm;
    const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (userName.length < 6 || !regExp.test(userName)) {
      setIdValidationError(true);
      return false;
    } else if (!reg_email.test(email)) {
      setEmailValidationError(true);
      return false;
    } else if (password.length < 8) {
      setPasswordValidationError(true);
      return false;
    } else if (password !== passwordConfirm) {
      setPasswordNotEqualError(true);
      return false;
    } else {
      return true;
    }
  }, [signupForm]);

  const register = useCallback(() => {
    clearErrorMsg();

    if (!signupForm.userName) {
      setEmptyIdError(true);
    } else if (!signupForm.email) {
      setEmptyEmailError(true);
    } else if (!signupForm.password) {
      setEmptyPasswordError(true);
    } else if (!signupForm.passwordConfirm) {
      setEmptyPasswordConfirmError(true);
    } else {
      const checkResult = checkValidation();

      if (checkResult) {
        axios
          .post("/auth/register", signupForm)
          .then(() => history.push("/"))
          .catch((err) => {
            // 이미 존재하는 아이디, 이메일 에러 처리
            const errorData = err.response.data;

            if (errorData.message.includes("username")) {
              setIdDuplicationError(true);
            } else if (errorData.message.includes("email")) {
              setEmailDuplicationError(true);
            }
          });
      }
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
      {idValidationError ? <p className="signupForm__errormsg">아이디가 유효하지 않습니다.</p> : null}
      {idDuplicationError ? <p className="signupForm__errormsg">이미 가입되어있는 아이디입니다.</p> : null}
      <input
        onChange={onChangeInput}
        className="signupform__email"
        type="text"
        placeholder="이메일"
        name="email"
        value={signupForm.email}
      />
      {emptyEmailError ? <p className="signupForm__errormsg">이메일을 입력해주세요.</p> : null}
      {emailValidationError ? <p className="signupForm__errormsg">이메일이 유효하지 않습니다.</p> : null}
      {emailDuplicationError ? <p className="signupForm__errormsg">이미 가입되어있는 이메일입니다.</p> : null}
      <input
        onChange={onChangeInput}
        className="signupform__password"
        type="password"
        placeholder="비밀번호"
        name="password"
        value={signupForm.password}
      />
      {emptyPasswordError ? <p className="signupForm__errormsg">비밀번호를 입력해주세요.</p> : null}
      {passwordValidationError ? <p className="signupForm__errormsg">비밀번호가 유효하지 않습니다.</p> : null}
      <input
        onChange={onChangeInput}
        className="signupform__password"
        type="password"
        placeholder="비밀번호 확인"
        name="passwordConfirm"
        value={signupForm.passwordConfirm}
      />
      {emptyPasswordConfirmError ? <p className="signupForm__errormsg">비밀번호 확인을 입력해주세요.</p> : null}
      {passwordNotEqualError ? <p className="signupForm__errormsg">비밀번호를 동일하게 입력해주세요.</p> : null}
      <button onClick={register} className="signupform__btn">
        회원가입
      </button>
      <div className="signupform__signup">
        계정이 있으신가요? <Link to="/">로그인하러 가기</Link>
      </div>
    </div>
  );
}
