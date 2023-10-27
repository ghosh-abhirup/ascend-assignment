import React, { useContext, useEffect, useState } from "react";
import Button from "./ui/Button";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { isDarkTheme, toggleTheme, userData, logoutHandler } =
    useContext(AppContext);

  return (
    <div className="navbar">
      {userData ? (
        <p className="navbarText">Welcome, {userData.name}</p>
      ) : (
        <p></p>
      )}
      <div className="flex items-center gap-2 sm:gap-6">
        <div
          className="w-10 h-10 text-black dark:text-white p-2 cursor-pointer hover:bg-black/[0.2] dark:hover:bg-white/[0.5] transition-all ease-in-out flex items-center justify-center rounded-full"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon
            icon={isDarkTheme ? faMoon : faSun}
            className="text-lg sm:text-xl"
          />
        </div>
        <Button text="Logout" onClick={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;
