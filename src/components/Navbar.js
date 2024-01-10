import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FaAngleDown } from "react-icons/fa";

const Navbar = ({user}) => {
  const [open, setOpen] = useState(true);
  const data_user = { user }
  console.log("cek data",user.user.username)
  const handleShow = () => {
    setOpen(!open);
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
        <p>Loog</p>
        <div className="relative">
          <button
            className="flex items-center gap-2 p-2"
            onClick={handleShow}
          >
            {user.user.username} <FaAngleDown />
          </button>
          {open ? <Dropdown /> : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
