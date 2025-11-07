import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import ModeToggle from "./components/ModeToggle";
// import NavComponent from "../src/components/NavComponent";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <NavComponent /> */}
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
