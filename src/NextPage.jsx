import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "./utils/Search";
import "./App.css";
import App from "./App";

export default function NextPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfToView, setPdfToView] = useState("");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    setResults(Search(query));
  }, [query])

  return (
    <>
      <section className="flex flex-col h-screen gap-4 p-4">
        <header className="relative bg-gradient-to-b from-[#009A68] to-emerald-500 text-white rounded-2xl p-1 shadow-md shadow-emerald-700">
          {/* Centered Title */}
          <article className="text-center">
            <h1 className="text-[21px] sm:text-2xl md:text-3xl font-bold font-mono">
              KARTA NG MAMAMAYAN
            </h1>
            <p className="text-base sm:text-lg md:text-2xl">
              CITIZEN’S CHARTER
            </p>
          </article>

          {/* Top-right button with tooltip */}
          <div className="absolute top-5 right-2 md:top-4 md:right-4 group">
            <button
              onClick={() => navigate("/")}
              className="bg-[#005840] p-1 md:p-3 rounded-full cursor-pointer shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </button>

            {/* Tooltip */}
            <div
              className="absolute right-0 top-full mt-2
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    pointer-events-none
                    bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap"
            >
              Exit
            </div>
          </div>
        </header>

        {/* Interactive Message */}
        <section className="bg-gray-50 shadow-sm gap-1 text-left items-center justify-start md:gap-2 text-gray-900 rounded-xl p-2 md:p-4 flex">
          <img
            src="src/assets/logo-SPC-est.png"
            className="size-13 md:size-18  drop-shadow-[0_0_0.1rem_#009A68]"
          />

          <article>
            <h1 className="text-sm sm:text-base font-bold sm:tracking-wide">
              Saang opisina mo gusto magtungo?
            </h1>
            <p className="text-xs md:text-sm tracking-tight sm:tracking-wide">
              (Which office do you want to transact?)
            </p>
          </article>
        </section>

        {/* MAIN CONTENT  -- QUICK SEARCH */}
        <section className="flex flex-col flex-1 overflow-hidden">
          {/* SEARCH */}
          <div className="relative flex items-center border border-gray-200 py-1.5 rounded-md px-2 mb-2 shadow-sm">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            {/* Input */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Office"
              className="w-full ps-2 pr-8 text-gray-800 font-medium placeholder:font-semibold outline-none"
            />

            {/* Clear Button */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Table/card Content */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow flex-1 overflow-hidden">
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {results.length > 0 ? (
                <ul className="space-y-3">
                  {results.map((res) => (
                    <li
                      key={res.name}
                      className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 rounded-md p-3 shadow-sm"
                    >
                      <span className="font-medium text-gray-800">
                        {res.name} - {res.office}
                      </span>

                      <div className="flex gap-3 mt-2 md:mt-0">
                        <a
                          href={res.link}
                          download
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          Download
                        </a>
                        <button
                          //   onClick={() => {
                          //     setPdfToView(res.link);
                          //     setPdfModalOpen(true);
                          //   }}
                          onClick={() => {
                            if (isMobile) {
                              window.open(res.link, "_blank"); // open directly
                            } else {
                              setPdfToView(res.link);
                              setPdfModalOpen(true);
                            }
                          }}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center  text-gray-400">
                  No data found
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="backdrop-blur-lg bg-white border border-gray-200 rounded-lg shadow-md py-1 px-3 font-semibold tracking-wide text-gray-400 text-sm cursor-pointer"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* VIEW - MODAL */}
          {pdfModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              {/* <div className="relative z-10 w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 h-3/4 overflow-y-auto"> */}
              <div className="relative z-10  bg-white w-11/12 md:w-3/4 lg:w-2/3 h-3/4 shadow-xl rounded-xl flex flex-col">
                {/* Modal header */}
                <div className="flex justify-between items-center p-4 ">
                  <h2 className="text-lg font-semibold">PDF Viewer</h2>

                  {/* Close button */}
                  <button
                    onClick={() => setPdfModalOpen(false)}
                    // className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal body */}
                <div className="flex-1 px-4 pb-4">
                  <iframe
                    src={pdfToView}
                    className="w-full h-full"
                    title="PDF Viewer"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
