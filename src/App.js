import "./App.css";
import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Login from "./components/LoginComp";
//import EventBus from "./common/eventBus";
import AuthService from "./services/AuthService";
//import Navbar from "./components/Navbar";
import FormPrice from "./components/Price/FormPrice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./components/Customer/Customer";
import Price from "./components/Price/Price";
import ViewCustomer from "./components/Customer/ViewCustomer";
import RootLayout from "./components/RootLayout";
import Navbar from "./components/Navbar";
import EditCustomer from "./components/Customer/EditCustomer";
import EditTransaction from "./components/EditTransaction";
//import AuthVerify from "./common/AuthVerify";

//import Customer from "./components/Customer/Customer";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  //const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    ///console.log('data', user)
   // console.log(user);
    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
       setShowAdminBoard(user.typeuser);
    }
    {/*
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    */}
  }, []);
  const logOut = () => {
    AuthService.logout();
    //setShowModeratorBoard(false);
    //setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <React.Fragment>
      {/*currentUser ? <Navbar user={currentUser} /> : null */}

      <BrowserRouter>
        {currentUser ? <Navbar user={currentUser} /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/price" element={<Price />} />
          <Route path="/price/add" element={<FormPrice />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/customers/:id" element={<ViewCustomer />} />
          <Route path="/transaction" element={<EditTransaction />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
