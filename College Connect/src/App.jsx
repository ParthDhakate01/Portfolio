import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Calendar from "./components/Calendar";
import Inbox from "./components/Inbox";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/events",
      element: (
        <>
          <Events />
        </>
      ),
    },

    {
      path: "/calendar",
      element: (
        <>
          <Calendar />
        </>
      ),
    },
    {
      path: "/inbox",
      element: (
        <>
          <Navbar />
          <Inbox />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
