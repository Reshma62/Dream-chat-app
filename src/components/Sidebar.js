import React from "react";
import { BsChatText } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { BiGroup } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { TbBellRinging } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usersInformation } from "../slices/userSlices"
const Sidebar = ( { active } ) => {
  let navigate = useNavigate();
  let dispatch= useDispatch()
  let handleLogOut = () => {
    navigate( "/login" );
    dispatch( usersInformation( null ) );
    localStorage.removeItem("userRegistationIfo");
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("images/top-curve-bg.png")',
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="pb-12 px-7"
      >
        <div className="w-[180px] max-mb580:w-[180px] max-mb991:w-[150px]">
          <Link to="/">
            <img src="images/logo.png" alt="" className="pt-5" />
          </Link>
        </div>
        <div className="flex landscape:max-mb991:justify-start max-mb991:md:justify-start  max-mb991:md:gap-10 landscape:max-mb991:gap-10 gap-5 justify-between py-7 max-mb580:py-7 max-mb768:py-2 landscape:max-mb768:py-5 items-center ">
          <div
            className={`${
              active == "home" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/">
              <AiOutlineHome
                className={` text-white text-3xl  max-mb768:text-2xl rounded-md `}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="User Lists"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "request" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/request">
              <BiGroup
                className="text-white text-2xl "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Friends"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "message" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/message">
              <BsChatText
                className={` text-white text-2xl `}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Message"
              />
            </Link>
          </div>
          <div
            className={`${
              active == "group" ? "before:bg-white" : "before:bg-transparent"
            } relative before:absolute before:w-[10px] before:h-[10px] before:content-[''] before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:rounded-full before:text-center`}
          >
            <Link to="/group">
              <FiEdit
                className="text-white text-2xl "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Groups"
              />
            </Link>
          </div>

          <div className="relative">
            <TbBellRinging
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Notifications"
            />
          </div>

          {/*  <div className="relative">
            <RiSettings5Line
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Settings"
            />
          </div> */}
          <div onClick={handleLogOut} className="relative cursor-pointer">
            <IoMdLogOut
              className="text-white text-2xl "
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="LogOut"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
