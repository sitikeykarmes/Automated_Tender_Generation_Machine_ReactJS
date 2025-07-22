import React, { useState } from "react";
import SubcriteriaDropdown from "./SubcriteriaDropdown";
import { Star } from "lucide-react";

export default function CategoryItem({ cat, selected, onSubcriteriaChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{cat.title}</span>
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "▲" : "▼"}
        </button>
      </div>
      {open && (
        <SubcriteriaDropdown
          sub={cat.sub}
          selected={selected}
          onChange={(subIdx) => onSubcriteriaChange(cat.id, subIdx)}
        />
      )}
    </div>
  );
}
