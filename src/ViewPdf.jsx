import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// ✅ FIX: worker (important for Vite)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ViewPdf() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const file = decodeURIComponent(queryParams.get("file") || "");

  const [numPages, setNumPages] = useState(null);

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

  console.log("PDF PATH:", file);

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 p-4">
      <h1 className="text-center font-bold mb-4">PDF Viewer</h1>

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
          className="px-4 py-2 bg-emerald-600 text-white rounded shadow"
        >
          Back
        </button>
      </div>
    </div>
  );
}
