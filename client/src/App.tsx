import React, { useCallback, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import { useDispatch } from "react-redux";
import { setUser } from "./modules/auth";

// Components
import Navbar from "./components/common/Navbar";
import Main from "./components/common/Main";

export default function App() {
  const dispatch = useDispatch();

  const onSilentRefresh = useCallback(() => {
    axios
      .post("/auth/token")
      .then(onLoginSuccess)
      .catch((err) => {});
  }, []);

  const onLoginSuccess = useCallback((response: AxiosResponse) => {
    dispatch(setUser(response));
    const accessToken = response.data.newAccessToken;
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["token"] = accessToken;
    setTimeout(onSilentRefresh, 1000 * 60 * 60 * 24);
  }, []);

  useEffect(() => {
    onSilentRefresh();
  }, []);

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}
