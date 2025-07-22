import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tenderAPI } from "../api";
import { criteriaData } from "../data/criteriaData";

// Helper function to find criteria by ID across all sectors
const findCriteriaById = (criteriaId, sector = null) => {
  if (sector && criteriaData[sector]) {
    return criteriaData[sector].find(c => c.id === criteriaId);
  }
  
  // If no sector specified, search through all sectors
  for (const sectorKey in criteriaData) {
    const found = criteriaData[sectorKey].find(c => c.id === criteriaId);
    if (found) return found;
  }
  return null;
};
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
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

import {
  GripVertical,
  Trash2,
  X,
  Plus,
  FileText,
  Eye,
  Download,
  Printer,
  BadgeCheck,
} from "lucide-react";

// Sortable drag-and-drop item wrapper
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#dbeafe" : "white",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children({ dragHandleProps: listeners })}
    </div>
  );
}

export default function Arrange() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selected, setSelected] = useState({});
  const [selectedSector, setSelectedSector] = useState(null);
  const [criteriaOrder, setCriteriaOrder] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  // Load data from local storage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedcat")) || {};
    const sector = JSON.parse(localStorage.getItem("selectedSector")) || null;
    setSelected(data);
    setSelectedSector(sector);
    setCriteriaOrder(Object.keys(data));
  }, []);

  const handleCriteriaDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setCriteriaOrder((items) =>
        arrayMove(items, items.indexOf(active.id), items.indexOf(over.id))
      );
    }
  };

  const handleSubcriteriaDragEnd = (catId, { active, over }) => {
    if (active.id !== over?.id) {
      setSelected((prev) => {
        const oldOrder = prev[catId];
        const newSubOrder = arrayMove(
          oldOrder,
          oldOrder.indexOf(active.id),
          oldOrder.indexOf(over.id)
        );
        const updated = { ...prev, [catId]: newSubOrder };
        localStorage.setItem("selectedcat", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleDeleteCategory = (catId) => {
    setSelected((prev) => {
      const updated = { ...prev };
      delete updated[catId];
      localStorage.setItem("selectedcat", JSON.stringify(updated));
      return updated;
    });
    setCriteriaOrder((prev) => prev.filter((id) => id !== catId));
  };

  const handleRemoveSubcriteria = (catId, subIdx) => {
    setSelected((prev) => {
      const updated = { ...prev };
      updated[catId] = updated[catId].filter((idx) => idx !== subIdx);
      if (updated[catId].length === 0) {
        delete updated[catId];
        setCriteriaOrder((prev) => prev.filter((id) => id !== catId));
      }
      localStorage.setItem("selectedcat", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteAll = () => {
    setSelected({});
    setCriteriaOrder([]);
    localStorage.removeItem("selectedcat");
  };

  const handleGenerateDocument = async () => {
    if (!user) {
      alert("Please log in to generate the tender.");
      navigate("/login");
      return;
    }
    setSaving(true);
    try {
      await tenderAPI.saveTender({
        title: `Tender ${new Date().toLocaleDateString()}`,
        sector: selectedSector?.id || "general",
        categories: selected,
        categoriesOrder: criteriaOrder,
        isDraft: false,
      });
      setGenerated(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving tender:", err);
      alert("Failed to save tender.");
    } finally {
      setSaving(false);
    }
  };

  const hasCategories = criteriaOrder.length > 0;

  const guardDownload = (fn) => {
    if (!generated) {
      alert("Please generate the tender using 'Generate Document' first.");
      return;
    }
    fn();
  };

  const generatePDF = () =>
    guardDownload(() => {
      import("jspdf").then(({ jsPDF }) => {
        const doc = new jsPDF();
        let y = 20;
        doc.setFontSize(16);
        doc.text("Tender Document", 20, y);
        y += 10;
        if (selectedSector) {
          doc.setFontSize(12);
          doc.text(`Sector: ${selectedSector.name}`, 20, y);
          y += 10;
        }
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, y);
        y += 15;
        criteriaOrder.forEach((catId) => {
          const cat = findCriteriaById(catId, selectedSector?.id);
          if (!cat) return;
          doc.setFontSize(14);
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
        });
        doc.save("tender_criteria.pdf");
      });
      //setShowPreviewModal(false);
    });

  const exportToExcel = () =>
    guardDownload(() => {
      const workbook = XLSX.utils.book_new();
      const worksheetData = [["Category", "Subcriteria", "Description"]];
      criteriaOrder.forEach((catId) => {
        const cat = findCriteriaById(catId, selectedSector?.id);
        if (!cat) return;
        (selected[catId] || []).forEach((subIdx) => {
          const sub = cat.sub[subIdx];
          worksheetData.push([cat.title, sub.label, sub.description]);
        });
      });
      const sheet = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, sheet, "Tender");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "tender_criteria.xlsx"
      );
      //setShowPreviewModal(false);
    });

  const exportToJSON = () =>
    guardDownload(() => {
      const data = {
        title: `Tender ${new Date().toLocaleDateString()}`,
        sector: selectedSector?.name || "General",
        generatedDate: new Date().toISOString(),
        categories: criteriaOrder.map((catId) => {
          const cat = findCriteriaById(catId, selectedSector?.id);
          if (!cat) return null;
          return {
            id: cat.id,
            title: cat.title,
            subcriteria: selected[catId].map((subIdx) => {
              const sub = cat.sub[subIdx];
              return {
                label: sub.label,
                description: sub.description,
              };
            }),
          };
        }),
      };
      saveAs(
        new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
        "tender_criteria.json"
      );
      //setShowPreviewModal(false);
    });

  const exportToWord = () =>
    guardDownload(async () => {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "Tender Document",
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                text: `Generated on: ${new Date().toLocaleDateString()}`,
              }),
              ...(selectedSector
                ? [
                    new Paragraph({
                      text: `Sector: ${selectedSector.name}`,
                      bold: true,
                    }),
                  ]
                : []),
              ...criteriaOrder.flatMap((catId) => {
                const cat = findCriteriaById(catId, selectedSector?.id);
                if (!cat) return [];
                return [
                  new Paragraph({
                    text: cat.title,
                    heading: HeadingLevel.HEADING_1,
                  }),
                  ...(selected[catId] || []).flatMap((subIdx) => {
                    const sub = cat.sub[subIdx];
                    return [
                      new Paragraph({ text: sub.label, bullet: { level: 0 } }),
                      new Paragraph({ text: sub.description }),
                    ];
                  }),
                ];
              }),
            ],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "tender_criteria.docx");
      //setShowPreviewModal(false);
    });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Arrange Selected Criteria</h1>
        {showSuccess && (
          <div className="bg-green-100 text-green-800 p-3 rounded flex items-center gap-2 mb-4">
            <BadgeCheck className="w-5 h-5" />
            Tender generated successfully!
          </div>
        )}
        {criteriaOrder.length === 0 ? (
          <p className="text-gray-500">No categories selected.</p>
        ) : (
          <>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleCriteriaDragEnd}
            >
              <SortableContext items={criteriaOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-6 mb-6">
                  {criteriaOrder.map((catId) => {
                    const cat = findCriteriaById(catId, selectedSector?.id);
                    if (!cat) return null;
                    return (
                      <SortableItem key={catId} id={catId}>
                        {({ dragHandleProps }) => (
                          <div className="bg-white shadow p-4 rounded border">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex gap-2 items-center">
                                <span {...dragHandleProps} className="cursor-grab">
                                  <GripVertical className="w-4 h-4 text-gray-400" />
                                </span>
                                <h3 className="font-semibold text-lg">{cat.title}</h3>
                              </div>
                              <button
                                onClick={() => handleDeleteCategory(catId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            {/* Sub-criteria */}
                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={(e) => handleSubcriteriaDragEnd(catId, e)}
                            >
                              <SortableContext
                                items={selected[catId]}
                                strategy={verticalListSortingStrategy}
                              >
                                <div className="space-y-2">
                                  {selected[catId].map((subIdx) => {
                                    const sub = cat.sub[subIdx];
                                    return (
                                      <SortableItem key={subIdx} id={subIdx}>
                                        {({ dragHandleProps }) => (
                                          <div className="flex justify-between items-start bg-gray-50 p-3 rounded border">
                                            <div className="flex gap-3">
                                              <div {...dragHandleProps} className="cursor-grab mt-1">
                                                <GripVertical className="w-4 h-4 text-gray-400" />
                                              </div>
                                              <div>
                                                <h4 className="font-medium">{sub.label}</h4>
                                                <p className="text-sm text-gray-600">
                                                  {sub.description}
                                                </p>
                                              </div>
                                            </div>
                                            <button
                                              onClick={() => handleRemoveSubcriteria(catId, subIdx)}
                                              className="text-red-500 hover:text-red-700"
                                            >
                                              <X className="w-4 h-4" />
                                            </button>
                                          </div>
                                        )}
                                      </SortableItem>
                                    );
                                  })}
                                </div>
                              </SortableContext>
                            </DndContext>
                          </div>
                        )}
                      </SortableItem>
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate("/select-categories")}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                ← Back to Categories
              </button>

              <button
                onClick={() => {
                  setGenerated(false);
                  setShowPreviewModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview Tender
              </button>
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tender Preview</h2>
                <button onClick={() => setShowPreviewModal(false)}>
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                Sector: <strong>{selectedSector?.name}</strong> | Generated on:{" "}
                {new Date().toLocaleDateString()}
              </p>

              {/* Preview Categories */}
              <div className="space-y-5 mb-6">
                {criteriaOrder.map((catId) => {
                  const cat = findCriteriaById(catId, selectedSector?.id);
                  if (!cat) return null;

                  return (
                    <div key={catId}>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{cat.title}</h4>
                      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        {selected[catId].map((subIdx) => {
                          const sub = cat.sub[subIdx];
                          return (
                            <li key={subIdx}>
                              <strong>{sub.label}:</strong> {sub.description}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Generate + Download Buttons */}
              <div className="flex justify-between items-center">
                <button
                  className="text-gray-600 hover:text-black"
                  onClick={() => setShowPreviewModal(false)}
                >
                  Close
                </button>

                {!generated ? (
                  <button
                    onClick={handleGenerateDocument}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    {saving ? "Generating..." : "Generate Document"}
                  </button>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={generatePDF}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                    >
                      PDF
                    </button>
                    <button
                      onClick={exportToWord}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                      Word
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                    >
                      Excel
                    </button>
                    <button
                      onClick={exportToJSON}
                      className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
                    >
                      Print
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
