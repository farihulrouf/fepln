import "./App.css";
import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Login from "./components/LoginComp";
import EventBus from "./common/eventBus ";
import AuthService from "./services/AuthService";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
   
    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    //setShowModeratorBoard(false);
    //setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <>
      <Navbar user={currentUser} />
      <div claasName="container">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
