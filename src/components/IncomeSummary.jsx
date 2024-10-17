/* eslint-disable react/prop-types */
import { useState } from "react";
import IncomeListItem from "./IncomeListItem";
import FilterIcon from "./svg/FilterIcon";
import IncomeIcon from "./svg/IncomeIcon";
import SortIcon from "./svg/SortIcon";

const IncomeSummary = ({ incomeList, onSort, onFilter, onDelete, onEdit }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSortOpen = () => {
    setIsSortOpen(!isSortOpen);
    setIsFilterOpen(false);
  };

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSortOpen(false);
  };

  const handleSort = (type) => {
    onSort(type);
    setIsSortOpen(false);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilter(updatedCategories);
  };

  return (
    <div className="border rounded-md relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <IncomeIcon />
          </div>
          <h3 className="text-xl font-semibold leading-7 text-gray-800">
            Income
          </h3>
        </div>
        <div className="flex items-center gap-1">
          {/* Sorting */}
          <div className="relative inline-block text-left">
            <button
              onClick={handleSortOpen}
              type="button"
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <SortIcon />
            </button>

            <div
              className={`absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isSortOpen ? "block" : "hidden"
              }`}
              role="menu"
              aria-orientation="vertical"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                  onClick={() => handleSort("Low to High")}
                >
                  Low to High
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                  onClick={() => handleSort("High to Low")}
                >
                  High to Low
                </button>
              </div>
            </div>
          </div>

          {/* Filtering */}
          <div className="relative inline-block text-left">
            <button
              onClick={handleFilterOpen}
              type="button"
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <FilterIcon />
            </button>

            <div
              className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isFilterOpen ? "block" : "hidden"
              }`}
              aria-orientation="vertical"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {["Salary", "Outsourcing", "Bond", "Dividend"].map(
                  (category) => (
                    <label
                      key={category}
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income List */}
      <div className="p-4 divide-y">
        {incomeList.length > 0 ? (
          incomeList.map((income, index) => (
            <IncomeListItem
              key={index}
              {...income}
              onEdit={() => onEdit(income)}
              onDelete={() => onDelete(income)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No income records found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeSummary;
