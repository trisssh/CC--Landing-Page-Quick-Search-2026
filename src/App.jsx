import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <section
      onClick={() => navigate("/next")}
      className="min-h-screen bg-gradient-to-t from-[#009A68] to-emerald-500 text-white flex items-center justify-center px-2 cursor-pointer"
    >
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold font-mono">
            KARTA NG MAMAMAYAN
          </h1>
          <p className="text-xl md:text-3xl font-semibold">CITIZEN’S CHARTER</p>
        </div>

        <img src="src/assets/JP.png" className="size-75 md:size-95" />
        <p className="text-sm md:text-xl mb-6">
          "TULOY PO KAYO SA BAGONG SAN PABLO"
        </p>
        <p className="text-lg font-semibold">Click Anywhere</p>
      </div>
    </section>
  );
}

export default App;
