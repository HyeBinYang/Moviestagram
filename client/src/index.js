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

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.common["token"] =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ3ZXF3ZXF3IiwiaWF0IjoxNjM2MDMxOTU1LCJleHAiOjE2MzYwMzU1NTUsImlzcyI6Imh5ZWJpbiJ9.PNWbe4OhwybFEbqYHQDGIUqVPIk6l3tM-OObS2lq4gY";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
