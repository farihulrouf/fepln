import "./App.css";
import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Login from "./components/LoginComp";
//import EventBus from "./common/eventBus";
import AuthService from "./services/AuthService";
//import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [user, setUser] = useState({});
  //const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const token = AuthService.getCurrentUser();
    //const data_user = AuthService.parseJwt(token)
    if (token) {
      setCurrentUser(token);
      setUser(AuthService.parseJwt(token));
      // setUser(data_user)
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(token.typeuser);
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
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    window.location.reload();
   // console.log('test log')
  };

  return (
    <React.Fragment>
      {/*currentUser ? <Navbar user={currentUser} /> : null */}
      <div className="max-w-sm mx-auto">
        <BrowserRouter>
          {user ? <Navbar user={user} logOut={logOut} /> : null}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Profile user={user} />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
