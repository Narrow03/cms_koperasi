import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../Cms.css";

const CmsLayout = () => {
  return (
    <div className="cms-layout">
      <Navbar />
      <div className="cms-main-container">
        <Sidebar />
        <main className="cms-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CmsLayout;
