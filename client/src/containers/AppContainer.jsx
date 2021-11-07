import React from "react";
import { connect } from "react-redux";
import App from "../App";
// import { onSilentRefresh } from "../modules/auth";

function AppContainer() {
  return <App />;
}

const mapStateToProps = (state) => ({});

const mapStateToDispatch = (dispatch) => ({
  // onSilentRefresh() {
  //   dispatch(onSilentRefresh());
  // },
});

export default connect(mapStateToProps, mapStateToDispatch)(AppContainer);
