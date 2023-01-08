import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
