import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./FindIDForm.css";

function InputIDForm() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [emptyUsernameError, setEmptyUsernameError] = useState(false);
  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [notUsernameDuplicationError, setNotUsernameDuplicationError] = useState(false);

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setEmptyUsernameError(false);
    setUsernameValidationError(false);
    setNotUsernameDuplicationError(false);
  }, []);

  const searchPassword = useCallback(() => {
    const regUsername = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
    clearErrorMessage();

    if (!username) {
      setEmptyUsernameError(true);
    } else if (!regUsername.test(username)) {
      setUsernameValidationError(true);
    } else {
      // 해당 이메일이 존재하면 이메일로 아이디 보낸다.
      axios
        .post("/auth/check/username", { username })
        .then(() => {
          history.push({
            pathname: "/auth/reset/password",
            state: { username },
          });
        })
        .catch((err) => {
          const errorData = err.response.data;

          if (errorData.message && errorData.message.includes("username")) {
            setNotUsernameDuplicationError(true);
          }
        });
    }
  }, [username]);

  return (
    <div id="authForm">
      <h1 className="authForm__title">Moviestagram</h1>
      <input
        onChange={inputUsername}
        className="authForm__input"
        type="text"
        placeholder="아이디를 입력해주세요"
        name="userName"
        value={username}
      />
      {emptyUsernameError ? <p className="authForm__errormsg">아이디를 입력해주세요.</p> : null}
      {usernameValidationError ? <p className="authForm__errormsg">아이디가 유효하지 않습니다.</p> : null}
      {notUsernameDuplicationError ? <p className="authForm__errormsg">가입되어있지 않은 아이디입니다.</p> : null}
      <button onClick={searchPassword} className="authForm__btn">
        비밀번호 찾기
      </button>
      <div className="authForm__links">
        <Link to="/">로그인</Link>
        <Link to="/signup">가입하기</Link>
      </div>
      <div className="authForm__findlink">
        <Link to="/auth/find/username">아이디를 잊으셨나요?</Link>
      </div>
    </div>
  );
}

export default InputIDForm;
