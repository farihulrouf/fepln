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
      if (response.data.user.token) {
         localStorage.setItem("user", JSON.stringify(response.data));
      }
      //console.log(response.data)
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;