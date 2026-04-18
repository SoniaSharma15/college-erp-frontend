import DashboardLayout from "../../../components/layout/DashboardLayout";
import { 
  Users, 
  Building2, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  Mail, 
  Calendar 
} from "lucide-react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Mock data for premium feel
  const stats = [
    { title: "Total Colleges", value: "42", icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Active Admins", value: "128", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "System Health", value: "99.9%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Pending Approvals", value: "7", icon: ShieldCheck, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Upper Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Super Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back, here's what's happening with your system today.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Today's Date</p>
              <p className="text-sm font-semibold text-gray-700">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Profile & Action Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Profile Card */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
                  <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                    {user?.name?.charAt(0)}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wider">Super Administrator</p>
              
              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Verified Root Access</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Tasks / Recent Activity placeholder */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent System Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">New college registered: <span className="text-blue-600 italic font-semibold">"Stanford Institute"</span></p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago • Action by System</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;