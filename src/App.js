//import logo from "./logo.svg";
import "./App.css";
//import Navbar from "./components/Navbar";
//import Home from "./components/Home";
//import Login from "./pages/Login"
import Login from "./components/LoginComp" 
//import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function App() {
  console.log(process.env.API_URL,"Test");

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
