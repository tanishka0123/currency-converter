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
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border bg-gray-200 rounded-md shadow-sm
         focus:outline-none focus:ring-indigo-500"
        >
          {fav.map((curr) => {
            return (
              <option className="bg-gray-400" value={curr} key={curr}>
                {curr}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c) => !fav.includes(c))
            .map((curr) => {
              return (
                <option value={curr} key={curr}>
                  {curr}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handlefav(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFav(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
