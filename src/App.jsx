import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white flex flex-col items-center justify-center">
      <div className="container px-5">
        <CurrencyConverter></CurrencyConverter>
      </div>
    </div>
  );
}

export default App;
