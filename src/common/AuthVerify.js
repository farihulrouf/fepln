import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function AuthVerify (props) {
  console.log('data props', props)
  props.history.listen(() => {
    const user = JSON.parse(localStorage.getItem("authorization"));

    if (user) {
      const decodedJwt = parseJwt(user);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });

  return <div></div>;
};
