import axios from "axios";

const register = (username, email, password) => {
  return axios.post(process.env.REACT_APP_API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  //console.log("test",`${process.env.API_URL}`)
  return axios
    .post(process.env.REACT_APP_API_URL + "/users/login", {
      email,
      password,
    })
    .then((response) => {
     // console.log(response.data.user)
      {/*if (response.data.user.token) {
         localStorage.setItem("user", JSON.stringify(response.data));
      }
      */}
      //console.log(response.data)
      //console.log(response.data)
      localStorage.setItem("authorization", JSON.stringify(response.data.user.token));
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("authorization");
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  if (user) {
    const decodedJwt = parseJwt(user);

    if (decodedJwt.exp * 1000 < Date.now()) {
      logout()
      //props.logOut();
    }
  }
  return user
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;