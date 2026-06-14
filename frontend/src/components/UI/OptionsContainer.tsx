import React, { useState } from "react";
import LoginBar from "../Home/LoginBar";
import Navbar from "../Home/Navbar";

const OptionsContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F2F2F7] relative">
      {/* Sidebar - Desktop always visible, Mobile is a slide-in drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0B0B0B] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/6 md:shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navbar title="Netttool_FMS" />
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen overflow-y-auto overflow-x-hidden max-w-full">
        <LoginBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-grow w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OptionsContainer;