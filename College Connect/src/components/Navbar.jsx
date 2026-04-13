import React from "react";
import { NavLink } from "react-router-dom";
import home from "../assets/home.svg";
import meeting from "../assets/meeting.svg";
import deadline from "../assets/deadline.svg";
import calendar from "../assets/calendar.svg";
import inbox from "../assets/inbox.svg";
import todo from "../assets/todo.svg";

const Navbar = () => {
  const baseClass =
    "flex gap-2 px-2 py-1.5 mb-1 items-center rounded-md text-[#ada9a3]";
  const activeClass = "bg-[#2c2c2c] text-white";
  const inactiveClass = "hover:bg-[#2c2c2c]";

  return (
    <div className="flex flex-col bg-[#202020] w-[17vw] h-screen">
      <div className="navtitle flex gap-2 mx-4 my-4">
        <div className="namelogo bg-[#323231] rounded-sm flex items-center justify-center p-2 text-[13.431px] text-[#ada9a3] font-bold w-[22px] h-[22px]">
          P
        </div>
        <p className="text-[15px] font-medium text-white">Parth Dhakate</p>
      </div>

      <div className="navoptions flex flex-col gap-2 mx-4 my-3 mt-0">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <img src={home} alt="" width={17} height={17} />
              <p className="text-[16px] font-medium">Home</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <img src={meeting} alt="" width={17} height={17} />
              <p className="text-[16px] font-medium">Events</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <img src={calendar} alt="" width={17} height={17} />
              <p className="text-[16px] font-medium">Calendar</p>
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <img src={inbox} alt="" width={17} height={17} />
              <p className="text-[16px] font-medium">Inbox</p>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
