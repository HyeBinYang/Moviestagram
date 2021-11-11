import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import "./index.css";
import App from "./App";
// import AppContainer from "./containers/AppContainer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules/index";

axios.defaults.withCredentials = true;

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    {/* <CookiesProvider> */}
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    {/* </CookiesProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
