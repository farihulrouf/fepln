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
import PrivateRoute from "./components/PrivateRoute";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
//import Customer from "./components/Customer/Customer";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [user, setUser] = useState({})
  //const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const token = AuthService.getCurrentUser();
    //const data_user = AuthService.parseJwt(token)
    if (token) {
      setCurrentUser(token);
      setUser(AuthService.parseJwt(token))
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
  };

  //console.log('this one data', user)
  return (
    <React.Fragment>
      {/*currentUser ? <Navbar user={currentUser} /> : null */}

      <BrowserRouter>
        { user ? <Navbar user={user} /> : null }
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
            <Route
            path="/price"
            element={
              <PrivateRoute>
                <Price />
              </PrivateRoute>
            }
          />
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
