import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tenderAPI } from "../api";
import { criteriaData } from "../data/criteriaData";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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

export default function Arrange() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [criteriaOrder, setCriteriaOrder] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedcat")) || {};
    setSelected(data);
    setCriteriaOrder(Object.keys(data));
  }, []);

  // Main criteria reorder
  function handleCriteriaDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCriteriaOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Sub-criteria reorder
  function handleSubcriteriaDragEnd(catId, event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelected((prev) => {
        const oldSubOrder = prev[catId];
        const oldIndex = oldSubOrder.indexOf(active.id);
        const newIndex = oldSubOrder.indexOf(over.id);
        const newSubOrder = arrayMove(oldSubOrder, oldIndex, newIndex);
        const updated = {
          ...prev,
          [catId]: newSubOrder,
        };
        localStorage.setItem("selectedcat", JSON.stringify(updated));
        return updated;
      });
    }
  }

  // Delete a main category
  const handleDeleteCategory = (catId) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      delete newSelected[catId];
      localStorage.setItem("selectedcat", JSON.stringify(newSelected));
      return newSelected;
    });
    setCriteriaOrder((prev) => prev.filter((id) => id !== catId));
  };

  // Print PDF with descriptions
  const handlePrint = () => {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      let y = 20;
      doc.setFontSize(16);

      criteriaOrder.forEach((catId) => {
        const cat = criteriaData.find((c) => c.id === catId);
        if (!cat) return;
        doc.text(cat.title, 20, y);
        y += 10;
        doc.setFontSize(12);
        (selected[catId] || []).forEach((subIdx) => {
          const idx = Number(subIdx);
          const sub = cat.sub[idx];
          doc.text(`  ${sub.label}`, 25, y);
          y += 7;
          doc.text(`  Info: ${sub.description}`, 25, y);
          y += 10;
        });
        y += 5;
        doc.setFontSize(16);
      });

      doc.save("tender_criteria.pdf");
    });
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold text-center mb-6">
          Arrange Selected Categories
        </h2>
        <h3 className="text-m font-bold text-center mb-6">
          Drag and Drop in your desired order.
        </h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCriteriaDragEnd}
        >
          <SortableContext
            items={criteriaOrder}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {criteriaOrder.map((catId) => {
                const cat = criteriaData.find((c) => c.id === catId);
                if (!cat) return null;

                return (
                  <SortableItem key={catId} id={catId}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{cat.title}</h3>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteCategory(catId)}
                      >
                        Delete
                      </button>
                    </div>
                    {/* Subcriteria drag and drop */}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) =>
                        handleSubcriteriaDragEnd(catId, event)
                      }
                    >
                      <SortableContext
                        items={selected[catId]}
                        strategy={verticalListSortingStrategy}
                      >
                        <ul className="ml-6 mb-6">
                          {selected[catId].map((subIdx) => {
                            const sub = cat.sub[subIdx];
                            return (
                              <SortableItem key={subIdx} id={subIdx}>
                                <div>{sub.label}</div>
                              </SortableItem>
                            );
                          })}
                        </ul>
                      </SortableContext>
                    </DndContext>
                  </SortableItem>
                );
              })}
            </ul>
          </SortableContext>
        </DndContext>
        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Back &lt;
          </button>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded"
            onClick={handlePrint}
          >
            Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}
