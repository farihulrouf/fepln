import "./App.css";
import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Login from "./components/LoginComp";
import EventBus from "./common/eventBus ";
import AuthService from "./services/AuthService";
import Navbar from "./components/Navbar";
import FormPrice from "./components/Price/FormPrice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./components/Customer/Customer";
import Price from "./components/Price/Price";
import ViewCustomer from "./components/Customer/ViewCustomer";
//import Customer from "./components/Customer/Customer";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  //const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user);
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
    <React.Fragment>

      {/*currentUser ? <Navbar user={currentUser} /> : null */}
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/price" element={<Price />} />
            <Route path="/price/add" element={<FormPrice /> } />
            <Route path="/customers" element={<Customer />} />
            <Route path="/customers/:id" element={<ViewCustomer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
