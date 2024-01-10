import axios from "axios";
import authHeader from "./authHeader";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(process.env.REACT_APP_API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;