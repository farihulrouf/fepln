import React from "react";
import AuthService from "../services/AuthService";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
        hello masuk
    </div>
  );
};

export default Profile;