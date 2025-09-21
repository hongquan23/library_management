// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login.jsx";
import App from "./App.jsx";          // Trang cho User
import Librarian from "./Librarian.jsx";
{/*import Admin from "./Admin.jsx";      // Trang cho Admin
import Librarian from "./Librarian.jsx"; // Trang cho Librarian*/}

{/*  import "./loginn.css";
import "./adminn.css";
import "./library.css";*/}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<Login />} />

        {/* Trang chính sau login */}
        <Route path="/app" element={<App />} />
        <Route path="/librarian" element={<Librarian />} />
 {/*       <Route path="/admin" element={<Admin />} />
        <Route path="/librarian" element={<Librarian />} />*/}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
