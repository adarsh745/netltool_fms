import React from "react";
import CustomInput from "../Login/CustomInput";
import IconButton from "../UI/IconButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";

interface LoginBarProps {
  onToggleSidebar?: () => void;
}

const LoginBar: React.FC<LoginBarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  
  return (
    <div className="px-4 md:px-6 py-3 flex flex-row items-center justify-between bg-[#E5E5EA] border-b border-gray-100 gap-2 font-sans select-none">
      {/* Left side: Hamburger Toggle + Search */}
      <div className="flex items-center flex-1 max-w-sm">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 mr-2 rounded-md hover:bg-neutral-300/80 md:hidden text-gray-700 cursor-pointer transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Search */}
        <div className="w-full hidden sm:block">
          <CustomInput
            type="search"
            placeholder="Search anything..."
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Notification */}
        <div className="relative">
          <IconButton
            icon={<IoIosNotificationsOutline size={20} />}
            onClick={() => navigate("/notifications")}
          />
          {/* Badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gray-800 rounded-full ring-2 ring-white" />
        </div>

        {/* Settings */}
        <IconButton
          icon={<CiSettings size={20} />}
          onClick={() => navigate("/settings")}
        />
        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-2 md:mx-3" />

        {/* Profile */}
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default LoginBar;
