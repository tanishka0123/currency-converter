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

  const [loading, setloading] = useState(false);

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
    let updatedfavs = [...favorites];
    if (favorites.includes(currency)) {
      updatedfavs = updatedfavs.filter((item) => item !== currency);
    } else {
      updatedfavs.push(currency);
    }
    setFavorites(updatedfavs);
    localStorage.setItem("favs", JSON.stringify(updatedfavs));
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const convertCurrency = async () => {
    if (!amount) return;
    setloading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[to] + " " + to);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getCurrencty();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-600">
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
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-600" />
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
          className="block mt-2 text-sm font0-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-2 py-2 bg-purple-500 text-white rounded-md shadow-sm ${
            loading && "animate-pulse"
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-purple-900">
          Converted amount:{convertedAmount}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
