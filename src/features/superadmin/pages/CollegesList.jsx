import { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { 
  Building2, 
  Search, 
  MoreVertical, 
  Calendar, 
  Hash, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

const CollegesList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/college/all");
      setColleges(res.data.colleges);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(col => 
    col.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    col.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Institutions</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered colleges in the system.</p>
          </div>
          
          <div className="relative group w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search colleges..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> Institution Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5" /> Code
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Registration Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="4" className="px-6 py-4 bg-gray-50/30 h-16"></td>
                    </tr>
                  ))
                ) : filteredColleges.length > 0 ? (
                  filteredColleges.map((col) => (
                    <tr 
                      key={col._id} 
                      className="hover:bg-blue-50/30 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {col.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {col.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                          {col.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(col.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-400 hover:text-blue-600 transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-400 hover:text-gray-600 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">
                      No institutions found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium">
              Showing <span className="text-gray-900">{filteredColleges.length}</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded shadow-sm text-gray-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 text-xs font-bold bg-white border border-gray-200 rounded shadow-sm text-gray-600 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollegesList;