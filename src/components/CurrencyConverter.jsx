import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favs")) || [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  const getCurrencty = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handlefav = (currency) => {
    let updatedFavs = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavs = updatedFavs.filter((item) => item !== currency);
    } else {
      updatedFavs.push(currency);
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favs", JSON.stringify(updatedFavs));
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const convertCurrency = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[to] + " " + to);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrencty();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg">
      <h2 className="mb-5 text-3xl font-semibold text-purple-300">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          fav={favorites}
          currencies={currencies}
          title="From:"
          handlefav={handlefav}
          currency={from}
          setCurrency={setFrom}
        ></Dropdown>
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-3 bg-purple-500 rounded-full shadow-md hover:bg-purple-600 transition-all"
          >
            <HiArrowsRightLeft className="text-2xl text-white" />
          </button>
        </div>
        <Dropdown
          fav={favorites}
          currencies={currencies}
          title="To:"
          currency={to}
          handlefav={handlefav}
          setCurrency={setTo}
        ></Dropdown>
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block mt-4 text-sm font-medium text-gray-300"
        >
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all ${
            loading && "animate-pulse"
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-6 text-2xl font-semibold text-right text-purple-400">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
