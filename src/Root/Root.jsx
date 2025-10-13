import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
