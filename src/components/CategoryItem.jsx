import React, { useState } from "react";
import SubcriteriaDropdown from "./SubcriteriaDropdown";
import { Star } from "lucide-react";

export default function CategoryItem({ cat, selected, onSubcriteriaChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-white rounded shadow p-4 mb-4 ${isPriority ? 'border-l-4 border-blue-500' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isPriority && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-blue-500 fill-current" />
              <span className="text-xs text-blue-600 font-medium">#{priorityIndex + 1}</span>
            </div>
          )}
          <span className="font-semibold">{cat.title}</span>
        </div>
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
