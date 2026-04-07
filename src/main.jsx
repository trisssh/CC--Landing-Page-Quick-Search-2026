import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import NextPage from "./NextPage";
import ViewPdf from "./ViewPdf";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/next" element={<NextPage />} />
      <Route path="/view-pdf" element={<ViewPdf />} />
    </Routes>
  </BrowserRouter>
);
