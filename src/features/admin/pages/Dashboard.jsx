import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getCoursesAPI } from "../adminAPI";
import { 
  BookOpen, 
  GitBranch, 
  Users, 
  Plus, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  LayoutGrid
} from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCoursesAPI();
      setCourses(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Branches", value: "08", icon: GitBranch, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Students", value: "1,240", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">College Overview</h2>
            <p className="text-gray-500 mt-1 text-sm">Monitor academic progress and manage institutional data.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Course
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Courses List */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Recently Added Courses</h3>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="p-2">
              {loading ? (
                <div className="p-4 space-y-4 animate-pulse">
                  {[1, 2, 3].map(i => <div key={i} className="h-14 bg-gray-50 rounded-xl" />)}
                </div>
              ) : courses.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">No courses published yet.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {courses.slice(0, 5).map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <LayoutGrid className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{c.name}</p>
                          <p className="text-xs font-bold text-blue-600/70 uppercase tracking-tighter">{c.code}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
              <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
              <p className="text-blue-100 text-xs mb-6">Manage your college operations efficiently.</p>
              
              <div className="space-y-3">
                {['Create Department', 'Assign Faculty', 'System Settings'].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium border border-white/10 backdrop-blur-md">
                    {action}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Support</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Need help with the management console?</p>
              <button className="mt-4 text-blue-600 font-bold text-sm hover:underline">Contact Tech Support</button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;