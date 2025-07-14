import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { criteriaData } from "../data/criteriaData";
import CategoryList from "../components/CategoryList";

export default function Home() {
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleNext = () => {
    localStorage.setItem("selectedcat", JSON.stringify(selected));
    navigate("/arrange");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-6">Categories</h2>
      <div className="max-w-2xl mx-auto mt-4">
        <CategoryList
          data={criteriaData}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded font-bold"
          onClick={handleNext}
        >
          Next &gt; ({totalSelected})
        </button>
      </div>
    </div>
  );
}
