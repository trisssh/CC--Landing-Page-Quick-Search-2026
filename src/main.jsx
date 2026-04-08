// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import App from "./App";
// import NextPage from "./NextPage";
// import ViewPdf from "./ViewPdf";



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/next" element={<NextPage />} />
//       <Route path="/view-pdf" element={<ViewPdf />} />
//     </Routes>
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import App from "./App";
import NextPage from "./NextPage";
import ViewPdf from "./ViewPdf";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/view-pdf" element={<ViewPdf />} />
      </Routes>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>,
);
