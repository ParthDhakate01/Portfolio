import React from "react";
import Navbar from "./Navbar";
import CalendarView from "./Fullcalendar";
import "./Calendar.css";
const Calendar = () => {
  return (
    <>
      <div className="content flex bg-[#191919]">
        <Navbar />
        <div className="calendar mx-40 my-10 w-[75vw]">
          <div className="calendartitle flex flex-col gap-2.5">
            <h2 className="ctitle text-white font-semibold text-4xl">
              Calendar
            </h2>
            <p className="text-[#b1b1b1]">
              All Events are displayed on the calendar
            </p>
          </div>
          <div className="fullcalendar mt-5">
            <CalendarView />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
