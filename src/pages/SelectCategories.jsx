// src/pages/SelectCategories.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criteriaData } from "../data/criteriaData";
import CategoryList from "../components/CategoryList";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Select Your Tender Categories
            </h1>
            <p className="text-lg text-gray-600">
              Choose the categories that best fit your tender requirements
            </p>
          </div>

          <CategoryList
            data={criteriaData}
            selected={selected}
            setSelected={setSelected}
          />

          <div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={handleNext}
              disabled={totalSelected === 0}
            >
              Continue to Arrange <ArrowRight className="w-4 h-4" /> (
              {totalSelected})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
