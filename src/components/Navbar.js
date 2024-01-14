import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FaAngleDown } from "react-icons/fa";
import Avatar from "react-avatar";
const Navbar = ({user}) => {
  const [open, setOpen] = useState(true);
  //const data_user = { user }
  //console.log("cek data",user.user.username)
  const handleShow = () => {
    setOpen(!open);
  };
  return (
    <>
      <nav className="flex items-center justify-between bg-indigo-700 flex-wrap p-2">
        <p>Loog</p>
        <div className="relative">
          <button
            className="flex items-center gap-2 p-2"
            onClick={handleShow}
          >
            <Avatar className="rounded-full" name={user.user.username} maxInitials={2} size={25}/>
            {user.user.username} <FaAngleDown />
          </button>
          {open ? <Dropdown /> : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
