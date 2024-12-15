import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";

function Dropdown({
  currencies,
  currency,
  setCurrency,
  fav,
  handlefav,
  title = "",
}) {
  const isFav = (curr) => fav.includes(curr);
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {title}
      </label>
      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {fav.map((curr) => (
            <option className="bg-gray-700" value={curr} key={curr}>
              {curr}
            </option>
          ))}
          <hr />
          {currencies
            .filter((c) => !fav.includes(c))
            .map((curr) => (
              <option className="bg-gray-800" value={curr} key={curr}>
                {curr}
              </option>
            ))}
        </select>
        <button
          onClick={() => handlefav(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-yellow-400 hover:text-yellow-500"
        >
          {isFav(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
