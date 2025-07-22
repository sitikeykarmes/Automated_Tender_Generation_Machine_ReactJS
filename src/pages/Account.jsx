import React, { useState, useEffect } from "react";
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
import {
  FileText,
  Clock,
  Download,
  Trash2,
  Eye,
  Calendar,
  User,
  Mail,
  History,
} from "lucide-react";

export default function Account() {
  const { user, logout } = useAuth();
  const [tenderHistory, setTenderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null);
  const [showTenderModal, setShowTenderModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTenderHistory();
    }
  }, [user]);

  const fetchTenderHistory = async () => {
    try {
      setLoading(true);
      const response = await tenderAPI.getTenderHistory();
      setTenderHistory(response.data);
    } catch (err) {
      setError("Failed to load tender history");
      console.error("Error fetching tender history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTender = async (tenderId) => {
    if (window.confirm("Are you sure you want to delete this tender?")) {
      try {
        await tenderAPI.deleteTender(tenderId);
        setTenderHistory((prev) => prev.filter((t) => t._id !== tenderId));
      } catch (err) {
        alert("Failed to delete tender");
      }
    }
  };

  const handleViewTender = (tender) => {
    setSelectedTender(tender);
    setShowTenderModal(true);
  };

  const handleDownloadTender = (tender) => {
    // Convert tender data to the format expected by the PDF generation
    const selected = {};
    const categoriesOrder = tender.categoriesOrder || [];

    // Convert Map to object for PDF generation
    if (tender.categories instanceof Map) {
      for (const [key, value] of tender.categories) {
        selected[key] = value;
      }
    } else {
      // Handle case where categories is already an object
      Object.assign(selected, tender.categories);
    }

    // Generate PDF using the same logic as Arrange.jsx
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      let y = 20;
      doc.setFontSize(16);
      doc.text(tender.title, 20, y);
      y += 15;
      doc.setFontSize(12);
      doc.text(
        `Generated on: ${new Date(tender.createdAt).toLocaleDateString()}`,
        20,
        y
      );
      y += 15;

      categoriesOrder.forEach((catId) => {
        const cat = findCriteriaById(catId, tender.sector);
        if (!cat) return;

        doc.setFontSize(14);
        doc.text(cat.title, 20, y);
        y += 10;
        doc.setFontSize(12);

        (selected[catId] || []).forEach((subIdx) => {
          const idx = Number(subIdx);
          const sub = cat.sub[idx];
          if (sub) {
            doc.text(`  ${sub.label}`, 25, y);
            y += 7;
            doc.text(`  Info: ${sub.description}`, 25, y);
            y += 10;
          }
        });
        y += 5;
      });

      doc.save(`${tender.title.replace(/\s+/g, "_")}.pdf`);
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-gray-600">
          You need to be logged in to access your account.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600">Professional User</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-3" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Member since {new Date().getFullYear()}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tender History Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <History className="w-6 h-6 mr-3 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Tender History
              </h3>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading tender history...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchTenderHistory}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : tenderHistory.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No tenders generated yet</p>
                <a
                  href="/select-categories"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Tender
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {tenderHistory.map((tender) => (
                  <div
                    key={tender._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {tender.title}
                      </h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewTender(tender)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Tender"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadTender(tender)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTender(tender._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Tender"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDate(tender.createdAt)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>
                        {tender.categoriesOrder?.length || 0} categories
                        selected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tender View Modal */}
      {showTenderModal && selectedTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedTender.title}
                </h3>
                <button
                  onClick={() => setShowTenderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                Generated on: {formatDate(selectedTender.createdAt)}
              </div>

              <div className="space-y-6">
                {selectedTender.categoriesOrder?.map((catId) => {
                  const cat = criteriaData.find((c) => c.id === catId);
                  if (!cat) return null;

                  const selectedSubs = selectedTender.categories[catId] || [];

                  return (
                    <div key={catId} className="border-b pb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {cat.title}
                      </h4>
                      <div className="space-y-2">
                        {selectedSubs.map((subIdx) => {
                          const sub = cat.sub[Number(subIdx)];
                          if (!sub) return null;

                          return (
                            <div
                              key={subIdx}
                              className="bg-gray-50 p-3 rounded"
                            >
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

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowTenderModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadTender(selectedTender)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
