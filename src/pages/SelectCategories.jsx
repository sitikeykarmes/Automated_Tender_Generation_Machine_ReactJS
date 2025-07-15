// src/pages/SelectCategories.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criteriaData } from "../data/criteriaData";
import CategoryList from "../components/CategoryList";
import { ArrowRight, Trash2 } from "lucide-react";

export default function SelectCategories() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedcat")) || {};
  });

  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleNext = () => {
    localStorage.setItem("selectedcat", JSON.stringify(selected));
    navigate("/arrange");
  };

  const handleClearAll = () => {
    setSelected({});
    localStorage.removeItem("selectedcat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Select Your Tender Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the categories that best fit your tender requirements. Our
              comprehensive criteria ensure all aspects are covered.
            </p>
            <div className="mt-6 flex justify-center items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {totalSelected} items selected
              </div>
              {totalSelected > 0 && (
                <button
                  onClick={handleClearAll}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-200 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CategoryList
            data={criteriaData}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-300"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={totalSelected === 0}
          >
            Continue to Arrange <ArrowRight className="w-4 h-4" />
            {totalSelected > 0 && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                {totalSelected}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
