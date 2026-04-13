import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import dailytodo from "../assets/dailytodo.svg";
import add from "../assets/add.svg";
import { v4 as uuidv4 } from "uuid";
import es from "../assets/es.svg";
const Home = () => {
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  const now = parseInt(
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      hour12: false,
    }),
    10,
  );
  const [Time, setTime] = useState(now);
  const [Greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        parseInt(
          new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            hour12: false,
          }),
          10,
        ),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (Time >= 5 && Time < 12) {
      setGreeting("Good Morning");
    } else if (Time >= 12 && Time < 17) {
      setGreeting("Good Afternoon");
    } else if (Time >= 17 && Time < 22) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, [Time]);

  const date = new Date();

  const day = date.toLocaleDateString("en-GB", { weekday: "long" });
  const d = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });

  const formatted = `${day}, ${d} ${month}`;

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handleTodoAdd = async () => {
    if (Todo.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: Todo,
        IsCompleted: false,
      };

      setTodos([...Todos, newTodo]);
      setTodo("");

      await fetch("http://localhost:3000/add", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  const handleCheckboxChange = async (e) => {
    let id = e.target.name;
    console.log(id);
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...Todos];
    newTodos[index].IsCompleted = !newTodos[index].IsCompleted;
    setTodos(newTodos);
    await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTodos[index]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleTodoDelete = async (e) => {
    let id = e.currentTarget.dataset.id;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...Todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    });
  };
  const getTodayEvents = (Events) => {
    const today = new Date();

    return Events.filter((event) => {
      const start = new Date(event.start);

      return (
        start.getDate() === today.getDate() &&
        start.getMonth() === today.getMonth() &&
        start.getFullYear() === today.getFullYear()
      );
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const [Events, setEvents] = useState([]);

  const [TodaysEvents, setTodaysEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  function setnotification(events) {
    events.forEach((event) => {
      let now = Date.now();
      let starttime = new Date(event.start).getTime();
      let notifytime = starttime - event.notification * 60 * 1000;
      const delay = notifytime - now;

      if (event.repeatDays.length > 0) {
        if (event.repeatDays.includes(new Date().getDay())) {
          if (delay > 0) {
            setTimeout(() => {
              new Notification("Reminder ⏰", {
                body: `${event.title} starts in ${event.notification} minutes`,
              });
            }, delay);
          }
        }
      } else {
        if (delay > 0) {
          setTimeout(() => {
            new Notification("Reminder ⏰", {
              body: `${event.title} starts in ${event.notification} minutes`,
            });
          }, delay);
        }
      }
    });
  }

  useEffect(() => {
    setTodaysEvents(getTodayEvents(Events));
    setnotification(Events);
  }, [Events]);

  return (
    <>
      <div className="content flex bg-[#191919]">
        <Navbar />
        <div className="main w-full h-screen overflow-y-auto align-bottom bg-[#191919]">
          <div className=" greetings justify-center items-center flex flex-col h-50 gap-2.5">
            <p className="text-white text-3xl font-semibold font-sans">
              {Greeting}
            </p>
            <p className="text-[#8c8c8c] font-sans">Today is {formatted}</p>
          </div>
          <div className="todo flex flex-col m-10 gap-4">
            <div className="todotitle flex justify-start gap-2">
              <img width={16} height={16} src={dailytodo} alt="" />
              <p className="text-[#ada9a3] font-medium text-[14px] font-sans">
                Daily To-Do
              </p>
            </div>
            <div className="todolist flex justify-center flex-col bg-[#1f1f1f] border-[#333333] border rounded-2xl">
              <div className="todos">
                {Todos.length === 0 && (
                  <div className="flex justify-center items-center">
                    <p className="px-10 py-20 text-[#8c8c8c]">No tasks Today</p>
                  </div>
                )}
                {Todos.map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="animate-todo-in flex items-center justify-between gap-2.5 px-3 py-2"
                    >
                      <div className="todoitem flex items-center gap-2.5">
                        <input
                          checked={todo.IsCompleted}
                          name={todo.id}
                          onChange={handleCheckboxChange}
                          className="w-5 h-5 appearance-none rounded 
         bg-[#1f1f1f] border border-[#434343]
         checked:bg-white checked:border-white
         relative cursor-pointer
         
         checked:after:content-['✔']
         checked:after:text-black
         checked:after:text-sm
         checked:after:absolute
         checked:after:top-1/2
         checked:after:left-1/2
         checked:after:-translate-x-1/2
         checked:after:-translate-y-1/2"
                          type="checkbox"
                        />
                        <p
                          className={`whitespace-normal text-lg font-sans waa ${todo.IsCompleted ? "line-through text-[#8c8c8c]" : "text-white"}`}
                        >
                          {todo.text}
                        </p>
                      </div>
                      <svg
                        onClick={handleTodoDelete}
                        data-id={todo.id}
                        className="cursor-pointer text-[#ada9a3] hover:text-red-500 transition-colors duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" />
                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" />
                        <path d="M9.5 16.5L9.5 10.5" />
                        <path d="M14.5 16.5L14.5 10.5" />
                      </svg>
                    </div>
                  );
                })}
              </div>
              <div className="cursor-pointer createtodo border-t border-[#333333] flex gap-2  p-2">
                <img
                  onClick={handleTodoAdd}
                  width={18}
                  height={18}
                  src={add}
                  alt=""
                />
                <input
                  onChange={handleTodoChange}
                  className="caret-white text-white text-lg placeholder-[#ada9a3] border-0 outline-none focus:outline-none w-full h-10"
                  type="text"
                  placeholder="Add a task"
                  value={Todo}
                />
              </div>
            </div>
          </div>
          <div className="events mt-15 top flex flex-col gap-3 justify-between mx-10">
            <div className="eventtitle flex justify-start gap-2">
              <img width={16} height={16} src={es} alt="" />
              <p className="text-[#ada9a3] font-medium text-[14px] font-sans">
                Today's Events
              </p>
            </div>
            <div className="flex bg-[#202020] rounded-lg p-3 gap-10">
              <div className="today text-[#e46458] font-medium text-[14px] font-sans">
                Today{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="events flex flex-col gap-5">
                {TodaysEvents.length === 0 && (
                  <div className="flex justify-center items-center">
                    <p className=" text-[#8c8c8c]">No events for Today</p>
                  </div>
                )}
                {TodaysEvents.map((e) => {
                  return (
                    <div
                      key={e.id}
                      className="event flex gap-3 justify-center items-center"
                    >
                      <div
                        className={`line w-1 h-12 rounded-lg`}
                        style={{ backgroundColor: e.color }}
                      ></div>
                      <div className="flex flex-col">
                        <p className="text-white text-md font-medium font-sans">
                          {e.title}
                        </p>
                        <p className="text-[#ada9a3] text-sm font-sans">{`${new Date(
                          e.start,
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} - ${new Date(e.end).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
