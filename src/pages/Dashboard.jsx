import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { tenderAPI } from "../api";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement 
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  Clock, 
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await tenderAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (err) {
      setError("Failed to load analytics");
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-gray-600">
          You need to be logged in to view your dashboard.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-8">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    'C1': 'Technical Requirements',
    'C2': 'Financial Evaluation',
    'C3': 'Vendor Experience',
    'C4': 'Legal & Compliance',
    'C5': 'Sustainability',
    'C6': 'Delivery & Implementation',
    'C7': 'Innovation & Value',
    'C8': 'Health & Safety',
    'C9': 'Localization & Social'
  };

  const categoryChartData = {
    labels: Object.keys(analytics.categoryCount).map(id => categoryLabels[id] || id),
    datasets: [
      {
        label: 'Times Used',
        data: Object.values(analytics.categoryCount),
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
          '#06B6D4', '#F97316', '#84CC16', '#EC4899'
        ],
        borderColor: [
          '#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED',
          '#0891B2', '#EA580C', '#65A30D', '#DB2777'
        ],
        borderWidth: 1
      }
    ]
  };

  const draftVsFinalizedData = {
    labels: ['Draft', 'Finalized'],
    datasets: [
      {
        data: [analytics.draftTenders, analytics.finalizedTenders],
        backgroundColor: ['#FEF3C7', '#D1FAE5'],
        borderColor: ['#F59E0B', '#10B981'],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Usage Statistics'
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Draft vs Finalized Tenders'
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user.name}! Here's your tender generation overview.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tenders</p>
              <p className="text-3xl font-bold text-blue-600">{analytics.totalTenders}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-green-600">{analytics.tendersThisMonth}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.tendersThisWeek}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Prep Time</p>
              <p className="text-3xl font-bold text-orange-600">{analytics.averagePreparationTime}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Usage Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Category Usage</h3>
          </div>
          {Object.keys(analytics.categoryCount).length > 0 ? (
            <Bar data={categoryChartData} options={chartOptions} />
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>

        {/* Draft vs Finalized Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <PieChart className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Draft vs Finalized</h3>
          </div>
          {(analytics.draftTenders + analytics.finalizedTenders) > 0 ? (
            <Pie data={draftVsFinalizedData} options={pieChartOptions} />
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Most Used Categories & Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Used Categories */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Most Used Categories</h3>
          </div>
          <div className="space-y-3">
            {analytics.mostUsedCategories.length > 0 ? (
              analytics.mostUsedCategories.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">
                    {categoryLabels[item.categoryId] || item.categoryId}
                  </span>
                  <span className="text-sm text-gray-600">{item.count} times</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Most Used Sectors */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold">Most Used Sectors</h3>
          </div>
          <div className="space-y-3">
            {analytics.mostUsedSectors.length > 0 ? (
              analytics.mostUsedSectors.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium capitalize">
                    {item.sector || 'General'}
                  </span>
                  <span className="text-sm text-gray-600">{item.count} times</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}