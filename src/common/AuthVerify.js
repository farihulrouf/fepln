import React from "react";
//import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const navigate = useNavigate()
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

  return <>OK</>
};
export default AuthVerify

