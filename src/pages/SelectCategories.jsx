// src/pages/SelectCategories.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criteriaData, sectors } from "../data/criteriaData";
import CategoryList from "../components/CategoryList";
import { ArrowRight, Trash2, Building, ChevronRight } from "lucide-react";

export default function SelectCategories() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState(null);
  const [selected, setSelected] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedcat")) || {};
  });

  useEffect(() => {
    const savedSector = localStorage.getItem("selectedSector");
    if (savedSector) {
      setSelectedSector(JSON.parse(savedSector));
    }
  }, []);

  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
    localStorage.setItem("selectedSector", JSON.stringify(sector));
    // Clear previous selections when sector changes
    setSelected({});
    localStorage.removeItem("selectedcat");
  };

  const handleNext = () => {
    localStorage.setItem("selectedcat", JSON.stringify(selected));
    navigate("/arrange");
  };

  const handleClearAll = () => {
    setSelected({});
    localStorage.removeItem("selectedcat");
  };

  const handleBackToSector = () => {
    setSelectedSector(null);
    localStorage.removeItem("selectedSector");
    setSelected({});
    localStorage.removeItem("selectedcat");
  };

  // Get criteria data based on selected sector
  const getSectorCriteria = () => {
    if (!selectedSector) return [];
    return criteriaData[selectedSector.id] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {!selectedSector
                ? "Select Your Sector"
                : "Select Your Tender Categories"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {!selectedSector
                ? "Choose the sector that best fits your tender to get relevant templates and prioritized criteria."
                : `${selectedSector.name} tender categories prioritized for your needs.`}
            </p>
            {selectedSector && (
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
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedSector ? (
          /* Sector Selection */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectors.map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => handleSectorSelect(sector)}
                  className="p-6 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                      <span className="font-semibold text-gray-900 group-hover:text-blue-700">
                        {sector.name}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Specialized criteria for {sector.name.toLowerCase()} tenders
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Category Selection */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  {selectedSector.name}
                </span>
              </div>
              <button
                onClick={handleBackToSector}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ← Change Sector
              </button>
            </div>

            <CategoryList
              data={getSectorCriteria()}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-300"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
          {selectedSector && (
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
          )}
        </div>
      </div>
    </div>
  );
}
