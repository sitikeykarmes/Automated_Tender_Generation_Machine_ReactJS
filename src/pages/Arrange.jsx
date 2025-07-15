import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tenderAPI } from "../api";
import { criteriaData } from "../data/criteriaData";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

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

import { GripVertical, Trash2, X, Plus, FileText, Eye, Download, Printer } from "lucide-react";

// SortableItem with drag handle support
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
  const [exporting, setExporting] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));

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
        const updatedOrder = arrayMove(
          oldOrder,
          oldOrder.indexOf(active.id),
          oldOrder.indexOf(over.id)
        );
        const updated = { ...prev, [catId]: updatedOrder };
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

  const saveTenderToHistory = async (isDraft = false) => {
    if (!user) return;
    try {
      setSaving(true);
      await tenderAPI.saveTender({
        title: `Tender ${new Date().toLocaleDateString()}`,
        sector: selectedSector?.id || 'general',
        categories: selected,
        categoriesOrder: criteriaOrder,
        isDraft: isDraft
      });
    } catch (err) {
      console.error("Error saving tender:", err);
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = async () => {
    if (!user) {
      alert("Please log in to generate the tender.");
      navigate("/login");
      return;
    }

    await saveTenderToHistory(false);

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
        const cat = criteriaData.find((c) => c.id === catId);
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
    setShowPreviewModal(false);
  };

  const exportToExcel = async () => {
    setExporting('excel');
    await saveTenderToHistory(false);
    
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];
    
    // Add header
    worksheetData.push(['Category', 'Subcriteria', 'Description']);
    
    criteriaOrder.forEach((catId) => {
      const cat = criteriaData.find((c) => c.id === catId);
      if (!cat) return;
      
      (selected[catId] || []).forEach((subIdx) => {
        const sub = cat.sub[subIdx];
        worksheetData.push([cat.title, sub.label, sub.description]);
      });
    });
    
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tender Criteria");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'tender_criteria.xlsx');
    setExporting('');
    setShowPreviewModal(false);
  };

  const exportToWord = async () => {
    setExporting('word');
    await saveTenderToHistory(false);
    
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Tender Document",
                  bold: true,
                  size: 32,
                }),
              ],
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleDateString()}`,
                  italics: true,
                }),
              ],
            }),
            selectedSector && new Paragraph({
              children: [
                new TextRun({
                  text: `Sector: ${selectedSector.name}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({ text: "" }),
            ...criteriaOrder.flatMap((catId) => {
              const cat = criteriaData.find((c) => c.id === catId);
              if (!cat) return [];
              
              return [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cat.title,
                      bold: true,
                      size: 24,
                    }),
                  ],
                  heading: HeadingLevel.HEADING_1,
                }),
                ...(selected[catId] || []).flatMap((subIdx) => {
                  const sub = cat.sub[subIdx];
                  return [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: sub.label,
                          bold: true,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: sub.description,
                        }),
                      ],
                    }),
                    new Paragraph({ text: "" }),
                  ];
                }),
              ];
            }).filter(Boolean),
          ],
        },
      ],
    });
    
    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, 'tender_criteria.docx');
    setExporting('');
    setShowPreviewModal(false);
  };

  const exportToJSON = async () => {
    setExporting('json');
    await saveTenderToHistory(false);
    
    const tenderData = {
      title: `Tender ${new Date().toLocaleDateString()}`,
      sector: selectedSector?.name || 'General',
      generatedDate: new Date().toISOString(),
      categories: criteriaOrder.map((catId) => {
        const cat = criteriaData.find((c) => c.id === catId);
        if (!cat) return null;
        
        return {
          id: catId,
          title: cat.title,
          subcriteria: (selected[catId] || []).map((subIdx) => {
            const sub = cat.sub[subIdx];
            return {
              label: sub.label,
              description: sub.description,
            };
          }),
        };
      }).filter(Boolean),
    };
    
    const jsonString = JSON.stringify(tenderData, null, 2);
    const data = new Blob([jsonString], { type: 'application/json' });
    saveAs(data, 'tender_criteria.json');
    setExporting('');
    setShowPreviewModal(false);
  };

  const handlePreview = async () => {
    if (!user) {
      alert("Please log in to preview the tender.");
      navigate("/login");
      return;
    }
    
    await saveTenderToHistory(true); // Save as draft
    setShowPreviewModal(true);
  };

  const hasCategories = criteriaOrder.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Arrange Tender Categories</h1>
          <p className="text-lg text-gray-600">
            Drag and drop to reorder categories and criteria.
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
                        {({ dragHandleProps }) => (
                          <div className="bg-gray-50 rounded-lg border p-5">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <div
                                  {...dragHandleProps}
                                  className="cursor-grab hover:cursor-grabbing"
                                >
                                  <GripVertical className="w-5 h-5 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-lg">
                                  {cat.title}
                                </h3>
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {selected[catId].length} items
                                </span>
                              </div>
                              <button
                                onClick={() => handleDeleteCategory(catId)}
                                className="text-red-600 hover:text-red-800"
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
                                        {({ dragHandleProps }) => (
                                          <div className="bg-white border rounded p-4 flex justify-between items-start">
                                            <div className="flex items-start gap-3">
                                              <div
                                                {...dragHandleProps}
                                                className="cursor-grab hover:cursor-grabbing mt-1"
                                              >
                                                <GripVertical className="w-4 h-4 text-gray-400" />
                                              </div>
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
                                              onClick={() =>
                                                handleRemoveSubcriteria(
                                                  catId,
                                                  subIdx
                                                )
                                              }
                                              className="text-red-500 hover:text-red-700 p-1"
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
              className={`px-6 py-3 ${
                user
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white rounded flex items-center gap-2`}
              onClick={handlePreview}
              disabled={!user || saving}
            >
              <Eye className="w-4 h-4" />
              {saving ? "Saving..." : "Preview Tender"}
            </button>
          </div>
        )}
        
        {/* Preview Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Tender Preview
                  </h3>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                  {selectedSector && (
                    <p>Sector: <span className="font-semibold">{selectedSector.name}</span></p>
                  )}
                  <p>Generated on: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-6">
                    {criteriaOrder.map((catId) => {
                      const cat = criteriaData.find((c) => c.id === catId);
                      if (!cat) return null;

                      return (
                        <div key={catId} className="border-b pb-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
                            {cat.title}
                          </h4>
                          <div className="space-y-2">
                            {(selected[catId] || []).map((subIdx) => {
                              const sub = cat.sub[subIdx];
                              return (
                                <div key={subIdx} className="bg-white p-3 rounded">
                                  <div className="font-medium text-gray-900">
                                    {sub.label}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {sub.description}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={generatePDF}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      PDF
                    </button>
                    <button
                      onClick={exportToWord}
                      disabled={exporting === 'word'}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      {exporting === 'word' ? 'Exporting...' : 'Word'}
                    </button>
                    <button
                      onClick={exportToExcel}
                      disabled={exporting === 'excel'}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      {exporting === 'excel' ? 'Exporting...' : 'Excel'}
                    </button>
                    <button
                      onClick={exportToJSON}
                      disabled={exporting === 'json'}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      {exporting === 'json' ? 'Exporting...' : 'JSON'}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
