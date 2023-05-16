import React from "react";
import SideBar from "../SideBar/Sidebar";
function Layout({ children }) {
  return (
    <div className="bg-blue-900 min-h-screen flex text-white ">
      <SideBar />
      <div className="flex-grow bg-white mt-2 mr-2 mb-2 rounded-lg p-3 text-black">
        {children}
      </div>
    </div>
  );
}

export default Layout;
