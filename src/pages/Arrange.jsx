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
import { GripVertical, Trash2, X, Plus, FileText } from "lucide-react";

// Sortable Item Wrapper
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
    backgroundColor: isDragging ? "#dbeafe" : "white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // ✅ Correct listener placement
    >
      {children}
    </div>
  );
}

export default function Arrange() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selected, setSelected] = useState({});
  const [criteriaOrder, setCriteriaOrder] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedcat")) || {};
    setSelected(data);
    setCriteriaOrder(Object.keys(data));
  }, []);

  // Sensors - use once globally
  const sensors = useSensors(useSensor(PointerSensor));

  const hasCategories = criteriaOrder.length > 0;

  function handleCriteriaDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCriteriaOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleSubcriteriaDragEnd(catId, event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
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

  const handleDeleteCategory = (catId) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      delete newSelected[catId];
      localStorage.setItem("selectedcat", JSON.stringify(newSelected));
      return newSelected;
    });
    setCriteriaOrder((prev) => prev.filter((id) => id !== catId));
  };

  const handleRemoveSubcriteria = (catId, subIdx) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      newSelected[catId] = newSelected[catId].filter((idx) => idx !== subIdx);

      if (newSelected[catId].length === 0) {
        delete newSelected[catId];
        setCriteriaOrder((prevOrder) => prevOrder.filter((id) => id !== catId));
      }

      localStorage.setItem("selectedcat", JSON.stringify(newSelected));
      return newSelected;
    });
  };

  const handleDeleteAll = () => {
    setSelected({});
    setCriteriaOrder([]);
    localStorage.removeItem("selectedcat");
  };

  const saveTenderToHistory = async () => {
    if (!user) return;
    try {
      setSaving(true);
      const tenderData = {
        title: `Tender ${new Date().toLocaleDateString()}`,
        categories: selected,
        categoriesOrder: criteriaOrder,
      };
      await tenderAPI.saveTender(tenderData);
    } catch (error) {
      console.error("Error saving tender:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = async () => {
    if (user) await saveTenderToHistory();

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
          const sub = cat.sub[subIdx];
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Arrange Tender Categories</h1>
          <p className="text-lg text-gray-600">
            Drag and drop to reorder categories and their criteria.
          </p>
          {hasCategories && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {criteriaOrder.length} categories selected
              </div>
              <button
                onClick={handleDeleteAll}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-200 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!hasCategories ? (
          <div className="bg-white p-12 rounded shadow text-center border">
            <div className="mb-6">
              <FileText className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              No Categories Selected
            </h3>
            <p className="text-gray-600 mb-6">
              Select tender categories to begin arranging your document.
            </p>
            <button
              onClick={() => navigate("/select-categories")}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 inline-block mr-1" />
              Select Categories
            </button>
          </div>
        ) : (
          <div className="bg-white rounded border p-6 shadow-sm">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleCriteriaDragEnd}
            >
              <SortableContext
                items={criteriaOrder}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-6">
                  {criteriaOrder.map((catId) => {
                    const cat = criteriaData.find((c) => c.id === catId);
                    if (!cat) return null;

                    return (
                      <SortableItem key={catId} id={catId}>
                        <div className="bg-gray-50 rounded-lg border p-5">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <GripVertical className="w-5 h-5 text-gray-400" />
                              <h3 className="font-semibold text-lg">
                                {cat.title}
                              </h3>
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {selected[catId].length} items
                              </span>
                            </div>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteCategory(catId)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) =>
                              handleSubcriteriaDragEnd(catId, e)
                            }
                          >
                            <SortableContext
                              items={selected[catId]}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-3">
                                {selected[catId].map((subIdx) => {
                                  const sub = cat.sub[subIdx];
                                  return (
                                    <SortableItem key={subIdx} id={subIdx}>
                                      <div className="bg-white border rounded p-4 flex justify-between items-start">
                                        <div className="flex items-start gap-3">
                                          <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                                          <div>
                                            <h4 className="font-medium text-gray-800">
                                              {sub.label}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                              {sub.description}
                                            </p>
                                          </div>
                                        </div>
                                        <button
                                          className="text-red-500 hover:text-red-700 p-1"
                                          onClick={() =>
                                            handleRemoveSubcriteria(
                                              catId,
                                              subIdx
                                            )
                                          }
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </SortableItem>
                                  );
                                })}
                              </div>
                            </SortableContext>
                          </DndContext>
                        </div>
                      </SortableItem>
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {hasCategories && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/select-categories")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              ← Back to Selection
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
              onClick={handlePrint}
              disabled={saving}
            >
              <FileText className="w-4 h-4" />
              {saving ? "Saving..." : "Generate PDF"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
