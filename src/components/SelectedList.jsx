import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { criteriaData } from "../data/criteriaData";

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#d1fae5" : "white",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #ccc",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
}

export default function SelectedList({ selected, order, onDelete, sensors, handleSubcriteriaDragEnd }) {
  return (
    <ul>
      {order.map((catId) => {
        const cat = criteriaData.find((c) => c.id === catId);
        if (!cat) return null;
        return (
          <SortableItem key={catId} id={catId}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{cat.title}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => onDelete(catId)}
              >
                Delete
              </button>
            </div>
            {/* Sub-criteria drag-and-drop */}
            <SubcriteriaSortableList
              cat={cat}
              catId={catId}
              selected={selected}
              sensors={sensors}
              handleSubcriteriaDragEnd={handleSubcriteriaDragEnd}
            />
          </SortableItem>
        );
      })}
    </ul>
  );
}

// Sub-criteria sortable list
import {
  DndContext,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/core";

function SubcriteriaSortableList({ cat, catId, selected, sensors, handleSubcriteriaDragEnd }) {
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={event => handleSubcriteriaDragEnd(catId, event)}
    >
      <SortableContext
        items={selected[catId]}
        strategy={verticalListSortingStrategy}
      >
        <ul className="ml-6 mb-6">
          {selected[catId].map((subIdx) => (
            <SortableItem key={subIdx} id={subIdx}>
              <div>{cat.sub[subIdx].label}</div>
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
