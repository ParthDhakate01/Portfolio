import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import add from "../assets/add.svg";
import addevents from "../assets/addevents.svg";
import { v4 as uuidv4 } from "uuid";
import es from "../assets/es.svg";
import clock from "../assets/clock.svg";
import del from "../assets/delete.svg";
const Events = () => {
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const [Events, setEvents] = useState([]);
  useEffect(() => {
    // console.log(Events);
  }, [Events]);

  const [sortedEvents, setSortedEvents] = useState([]);
  useEffect(() => {
    setSortedEvents(
      [...Events].sort((a, b) => {
        return new Date(a.start) - new Date(b.start);
      }),
    );
    // console.log(sortedEvents);
  }, [Events]);
  const addEventRef = useRef(true);
  const [addEvent, setaddEvent] = useState(addEventRef.current);
  const [color, setColor] = useState("#6366f1");
  const Colors = [
    {
      name: "darkblue",
      value: "#6366f1",
    },
    {
      name: "purple",
      value: "#8b5cf6",
    },
    {
      name: "pink",
      value: "#ec4899",
    },
    {
      name: "red",
      value: "#ed201d",
    },
    {
      name: "orange",
      value: "#fd7941",
    },
    {
      name: "yellow",
      value: "#eab308",
    },
    {
      name: "green",
      value: "#22c55e",
    },
    {
      name: "lightblue",
      value: "#06b6d4",
    },
  ];
  const Days = [
    {
      name: "Mon",
      value: 1,
    },
    {
      name: "Tue",
      value: 2,
    },
    {
      name: "Wed",
      value: 3,
    },
    {
      name: "Thu",
      value: 4,
    },
    {
      name: "Fri",
      value: 5,
    },
    {
      name: "Sat",
      value: 6,
    },
    {
      name: "Sun",
      value: 7,
    },
  ];
  const [repeatDays, setRepeatDays] = useState(new Set());

  const toggleDay = (daynumber) => {
    setRepeatDays((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(daynumber)) {
        newSet.delete(daynumber);
      } else {
        newSet.add(daynumber);
      }
      setEvent((prev) => {
        return { ...prev, repeatDays: Array.from(newSet) };
      });
      return newSet;
    });
  };

  const handleAddEvent = () => {
    addEventRef.current = !addEventRef.current;
    setaddEvent(addEventRef.current);
  };

  const handleOnChange = (e) => {
    setEvent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const [Event, setEvent] = useState({
    id: uuidv4(),
    title: "",
    start: "",
    end: "",
    description: "",
    color: "#6366f1",
    notification: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Event);
    const res = await fetch("http://localhost:3000/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Event),
    });
    const data = await res.json();
    setEvents((prev) => [...prev, data]);
  };

  const handleDelete = async (e) => {
    const id = e.target.dataset.id;
    let res = await fetch(`http://localhost:3000/deleteEvent/${id}`, {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    let data = await res.json();
    // console.log(data);
    setEvents(data);
  };

  return (
    <>
      <div className="content flex bg-[#191919]">
        <Navbar />
        <div className="h-screen overflow-y-auto bg-[#191919] w-full">
          <div className="mt-15 top flex justify-between mx-40">
            <div className="eventtitle items-center flex justify-start gap-2">
              <img width={16} height={16} src={addevents} alt="" />
              <p className="text-[#ada9a3] font-medium text-[14px] font-sans">
                Add Events
              </p>
            </div>
            <button
              onClick={handleAddEvent}
              className="cursor-pointer p-2 rounded-lg hover:bg-[#2c2c2b] flex items-center gap-2"
            >
              <img width={16} height={16} src={add} alt="" />
            </button>
          </div>
          {addEvent && (
            <div className="animate-form-in addevent my-2 mx-38 rounded-lg p-2.5">
              <div className="bg-[#202020] border-[#333333] border flex flex-col p-5 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5 ">
                    <p className="text-white font-medium text-[14px] font-sans">
                      Event Name
                    </p>
                    <input
                      className="border border-[#333333] rounded-lg p-1 text-[14px] text-white "
                      type="text"
                      name="title"
                      value={Event.title}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="flex">
                    <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5">
                      <p className="text-white font-medium text-[14px] font-sans">
                        Start
                      </p>
                      <input
                        className="text-transparent border border-[#333333] rounded-lg p-1 text-[14px] focus:text-white valid:text-white"
                        type="datetime-local"
                        name="start"
                        value={Event.start}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5">
                      <p className="text-white font-medium text-[14px] font-sans">
                        End
                      </p>
                      <input
                        className="text-[#202020] border border-[#333333] rounded-lg p-1 text-[14px] focus:text-white valid:text-white"
                        type="datetime-local"
                        name="end"
                        value={Event.end}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5 ">
                    <p className="text-white font-medium text-[14px] font-sans">
                      Repeat
                    </p>
                    <div className="flex gap-2">
                      {Days.map((d) => {
                        return (
                          <label className="cursor-pointer" key={d.value}>
                            <input
                              type="checkbox"
                              className="hidden peer"
                              onChange={() => toggleDay(d.value)}
                              checked={repeatDays.has(d.value)}
                            />

                            <div
                              className="
                           text-center flex items-center justify-center w-14 h-8 rounded-lg border
                           bg-[#242424] text-[#7f7f7f] border-[#242424]
                           text-[14px] font-sans font-medium

                           hover:bg-[#2e2e2e] hover:text-white

                           peer-checked:bg-[#6366f1]
                           peer-checked:text-white

                           peer-checked:hover:bg-[#6366f1]
                           peer-checked:hover:text-white

                           transition-colors duration-150 ease-in-out "
                            >
                              {d.name}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-10 items-center ">
                    <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5 ">
                      <p className="text-white font-medium text-[14px] font-sans">
                        Color
                      </p>
                      <div className="colorbutton flex gap-2">
                        {Colors.map((c) => {
                          return (
                            <label key={c.name} className="cursor-pointer">
                              <input
                                type="radio"
                                name="color"
                                value={c.value}
                                className="hidden peer"
                                onChange={(e) => {
                                  setColor(e.target.value);
                                  setEvent((prev) => {
                                    return { ...prev, color: e.target.value };
                                  });
                                }}
                              />
                              <div
                                style={{ backgroundColor: c.value }}
                                className={`w-5 h-5 rounded-full border-2 border-zinc-700 peer-checked:ring-2 peer-checked:ring-white`}
                              ></div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="noti">
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-medium text-[14px] font-sans">
                          Notification (minutes)
                        </p>
                        <input
                          className="text-[#202020] border border-[#333333] rounded-lg p-1 text-[14px] focus:text-white valid:text-white"
                          type="number"
                          name="notification"
                          onChange={handleOnChange}
                          value={Event.notification}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#202020] input flex flex-col gap-2 px-5 py-2.5 ">
                    <p className="text-white font-medium text-[14px] font-sans">
                      Description
                    </p>
                    <textarea
                      className="border border-[#333333] rounded-lg p-1 text-[14px] text-white "
                      name="description"
                      id="description"
                      value={Event.description}
                      onChange={handleOnChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={
                      Event.title === "" ||
                      Event.start === "" ||
                      Event.end === "" ||
                      new Date(Event.start) >= new Date(Event.end) ||
                      Event.notification < 0 ||
                      Event.start == Event.end
                    }
                    className="bg-[#6366f1] cursor-pointer ml-5 mt-3 px-5 py-2 text-sm font-medium rounded-lg text-white transition-colors disabled:bg-[#6366f1]/50 disabled:cursor-not-allowed"
                  >
                    Create event
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="events flex flex-col mt-5 top gap-10 justify-between mx-40 ">
            <div className="eventtitle items-center flex justify-start gap-2">
              <img width={16} height={16} src={es} alt="" />
              <p className="text-[#ada9a3] font-medium text-[14px] font-sans">
                Upcoming Events
              </p>
            </div>
            <div className="eventcards grid grid-cols-3 gap-6">
              {sortedEvents.map((event) => {
                return (
                  <div
                    className="animate-event-in eventcard group mb-2.5 p-5 rounded-lg bg-[#202020] border border-[#333333] hover:border-white"
                    key={event._id}
                  >
                    <div className="flex justify-between items-center">
                      <div className="border w-16 rounded-lg bg-[#2b2b2b] border-[#333333] date flex flex-col justify-center items-center">
                        <p className="month text-center text-white text-[16px] font-medium">
                          {new Date(event.start).toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </p>
                        <p className="date font text-center text-white font-medium text-[20px]">
                          {new Date(event.start).getDate()}
                        </p>
                      </div>
                      <div
                        onClick={handleDelete}
                        className="img opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          data-id={event._id}
                          className="hover:stroke-red-600 hover:cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          color="#ada9a3"
                          fill="none"
                          stroke="#ada9a3"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" />
                          <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" />
                          <path d="M9.5 16.5L9.5 10.5" />
                          <path d="M14.5 16.5L14.5 10.5" />
                        </svg>
                      </div>
                    </div>
                    <div className="eventinfo py-3">
                      <p className="text-white font-medium text-[22px] font-sans">
                        {event.title}
                      </p>
                    </div>
                    <div className="startend flex flex-col gap-2">
                      <div className="flex">
                        <img src={clock} width={16} height={16} alt="" />
                        <p className="text-[#868686] font-medium text-[14px] font-sans">
                          {new Date(event.start).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {"-"}
                          {new Date(event.end).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <p className="text-[#868686] font-medium text-[14px] font-sans">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
