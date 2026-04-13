import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState, useEffect, useRef } from "react";
const CalendarView = () => {
  const [events, setevents] = useState([]);
  const [formattedevents, setFormattedevents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      setevents(data);
    };
    fetchEvents();
  }, []);
  useEffect(() => {
    const formatevent = events.map((e) => {
      if (e.repeatDays && e.repeatDays.length > 0) {
        return {
          id: e._id,
          title: e.title,
          daysOfWeek: e.repeatDays,
          startTime: new Date(e.start).toLocaleTimeString(),
          endTime: new Date(e.end).toLocaleTimeString(),
          backgroundColor: e.color,
        };
      } else {
        return {
          id: e._id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
          backgroundColor: e.color,
        };
      }
    });
    setFormattedevents(formatevent);
    console.log(formatevent);
  }, [events]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={formattedevents}
      nowIndicator={true}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: "Today",
        week: "Week",
        day: "Day",
      }}
    />
  );
};

export default CalendarView;
