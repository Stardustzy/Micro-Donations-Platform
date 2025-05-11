import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Plus, Eye } from "lucide-react";


const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 bg-gray-50 min-h-screen w-full">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, {user?.name || "User"} 🎉</h1>
          <p className="text-gray-600">Here’s what’s happening with your causes today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Causes" value="4" />
          <StatCard title="Active Causes" value="2" />
          <StatCard title="Total Donations" value="KSh 23,400" />
        </div>

        {/* Main Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Donations</h2>
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-500 uppercase border-b">
                <tr>
                  <th className="py-2">Donor</th>
                  <th className="py-2">Cause</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">Jane Doe</td>
                  <td className="py-2">Help Kids Go to School</td>
                  <td className="py-2 text-green-600">KSh 1,000</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">John Smith</td>
                  <td className="py-2">Flood Relief 2024</td>
                  <td className="py-2 text-green-600">KSh 500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* My Causes */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">My Causes</h2>
              <a href="/create-cause" className="text-green-600 flex items-center gap-1 text-sm hover:underline">
                <Plus size={16} /> New Cause
              </a>
            </div>
            <ul className="divide-y">
              <li className="py-3 flex justify-between items-center">
                <span>Clean Water for All</span>
                <a href="/edit-cause/1" className="text-blue-500 flex items-center gap-1 text-sm hover:underline">
                  <Eye size={16} /> View
                </a>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span>Feeding Program Nairobi</span>
                <a href="/edit-cause/2" className="text-blue-500 flex items-center gap-1 text-sm hover:underline">
                  <Eye size={16} /> View
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
  </div>
);

export default Dashboard;
