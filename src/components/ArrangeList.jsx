import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { criteriaData } from "../data/criteriaData";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/core";
import SelectedList from "../components/SelectedList";

export default function Arrange() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [criteriaOrder, setCriteriaOrder] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedcat")) || {};
    setSelected(data);
    setCriteriaOrder(Object.keys(data));
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleDeleteCategory = (catId) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      delete newSelected[catId];
      localStorage.setItem("selectedcat", JSON.stringify(newSelected));
      return newSelected;
    });
    setCriteriaOrder((prev) => prev.filter((id) => id !== catId));
  };

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

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold text-center mb-6">Arrange Selected Categories</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCriteriaDragEnd}
        >
          <SortableContext items={criteriaOrder} strategy={verticalListSortingStrategy}>
            <SelectedList
              selected={selected}
              order={criteriaOrder}
              onDelete={handleDeleteCategory}
              sensors={sensors}
              handleSubcriteriaDragEnd={handleSubcriteriaDragEnd}
            />
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
