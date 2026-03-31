import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "./utils/Search";
import "./App.css";
import App from "./App";

export default function NextPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(Search(query));
  }, [query])

  return (
    <>
      <section className="flex flex-col gap-4 m-4">
        <header className="relative bg-gradient-to-b from-[#009A68] to-emerald-500 text-white rounded-2xl p-1 shadow-md shadow-emerald-700">
          {/* Centered Title */}
          <article className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-mono">
              KARTA NG MAMAMAYAN
            </h1>
            <p className="text-lg md:text-2xl">CITIZEN’S CHARTER</p>
          </article>

          {/* Top-right button with tooltip */}
          <div className="absolute top-4 right-4 group">
            <button className="bg-[#005840] p-2 md:p-3 rounded-full cursor-pointer shadow-md">
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

        <div className="bg-[#F2F2F2] text-left items-center justify-start md:gap-2 text-gray-900 rounded-xl p-2 md:p-4 flex">
          <img
            src="src/assets/logo-SPC-est.png"
            className="size-15 md:size-18  drop-shadow-[3px_1px_0px_#2b2b2b]"
          />

          <article>
            <h1 className="text-sm md:text-base font-bold tracking-tight md:tracking-wide">
              Saang opisina mo gusto magtungo?
            </h1>
            <p className="text-xs md:text-sm">
              (Which office do you want to transact?)
            </p>
          </article>
        </div>

        <section>
          {/* SEARCH */}
          <div>
            {/* <label className="block text-sm md:text-base text-gray-500 font-medium">
              Search Office
            </label> */}
            <div className="flex justify-center items-center border border-gray-200 py-1.5 rounded-md focus:outline-red-600 px-2 mb-2">
              {/* SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-500 font-semibold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Office"
                className="border-none outline-none w-full ps-2 text-gray-800 font-bold tracking-wide"
              />
            </div>
          </div>

          <div className=" text-center flex-col items-center justify-center backdrop-blur-lg bg-white border border-gray-200 rounded-lg shadow h-full max-h-32 p-10">
            { results.length > 0 ? (
              <ul>
                { results.map((res) => (
                  <li key={res.name}>
                    <span>{res.name} - {res.office}</span>
                    <a href={res.link} download> Download </a>
                    <a href={res.link} target="_blank"> View </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div colSpan="6" className="text-center text-gray-400">
                No data found
              </div>
            )}

            <button className="backdrop-blur-lg bg-white border border-gray-200 rounded-lg shadow-md py-1 px-3 font-semibold tracking-wide text-gray-400 text-sm cursor-pointer">
              Clear Search
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
