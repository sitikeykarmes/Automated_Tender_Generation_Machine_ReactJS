import React from "react";

export default function SubcriteriaDropdown({ sub, selected, onChange }) {
  return (
    <div className="mt-2">
      {sub.map((item, idx) => (
        <label key={idx} className="flex items-center space-x-2 mb-1">
          <input
            type="checkbox"
            checked={selected.includes(idx)}
            onChange={() => onChange(idx)}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
}
