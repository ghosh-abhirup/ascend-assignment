import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="h-[70px]">
        <Navbar user={"Abhirup"} />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
