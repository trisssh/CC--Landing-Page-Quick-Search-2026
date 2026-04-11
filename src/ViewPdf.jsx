import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef } from "react";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ViewPdf() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const file = decodeURIComponent(queryParams.get("file") || "");

  const [numPages, setNumPages] = useState(null);
  const scrollRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">No PDF selected</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

//Scroll to-top & down handler
const handleScroll = () => {
  const el = scrollRef.current;

  const isTop = el.scrollTop < 100;
  const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

  setShowTop(!isTop);
  setShowBottom(!isBottom);
};

//scroll-to-top & down function
const scrollToTop = () => {
  scrollRef.current.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToBottom = () => {
  scrollRef.current.scrollTo({
    top: scrollRef.current.scrollHeight,
    behavior: "smooth",
  });
};

  // console.log("PDF PATH:", file);

  return (
    <div 
    ref={scrollRef}
    onScroll={handleScroll}
    className="h-screen overflow-y-auto bg-gray-100 p-4">
      <header className="relative bg-gradient-to-b from-[#009A68] to-emerald-500 text-white rounded-2xl p-1 shadow-md shadow-emerald-700 mb-3">
        <article className="text-center">
          <h1 className="text-[21px] sm:text-2xl md:text-3xl font-bold font-mono">
            KARTA NG MAMAMAYAN
          </h1>
          <p className="text-base sm:text-lg md:text-2xl">CITIZEN’S CHARTER</p>
        </article>

        <div className="absolute top-5 right-2 md:top-4 md:right-4 group">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#005840] p-1 md:p-3 rounded-full cursor-pointer text-white text-xs md:text-sm shadow-sm transition hover:shadow-md active:scale-95"
          >
            Back
          </button>
        </div>
      </header>

      <h1 className="text-center font-bold mb-4">PDF Viewer</h1>

    <div className="fixed bottom-20 right-6 flex flex-col gap-2 z-50">
   {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </button>
      )}

        {showBottom && (
    <button
      onClick={scrollToBottom}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>


    </button>
  )}
      </div>
   
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p className="text-center">Loading PDF...</p>}
        error={(err) => {
          console.error("PDF ERROR:", err);
          return (
            <p className="text-center text-red-500">Failed to load PDF file.</p>
          );
        }}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div key={index} className="flex justify-center mb-4">
            <Page
              pageNumber={index + 1}
              width={window.innerWidth < 768 ? window.innerWidth * 0.95 : 800}
              className="shadow-lg"
            />
          </div>
        ))}
      </Document>

      {/* Back button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate(-1)}
          className="backdrop-blur-lg bg-emerald-500 shadow-sm transition hover:shadow-md active:scale-95 text-white border border-emerald-400 rounded-lg py-1 px-3 font-semibold tracking-wide text-sm cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}
