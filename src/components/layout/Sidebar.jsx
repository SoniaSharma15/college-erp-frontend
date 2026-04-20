import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  School, 
  Users, 
  BookOpen, 
  GitBranch, 
  ClipboardList, 
  FileText, 
  GraduationCap, 
  LogOut,
  Settings,
  Building2,
  File
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles[0];

  const menuConfig = {
    SUPER_ADMIN: [
      { name: "Dashboard", path: "/superadmin", icon: LayoutDashboard },
      { name: "Create College", path: "/superadmin/create-college", icon: School },
      { name: "Colleges", path: "/superadmin/colleges", icon: Building2 }
    ],
    COLLEGE_ADMIN: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "Staff", path: "/admin/staff", icon: Users },
      { name: "Departments", path: "/admin/departments", icon: Building2 },
      { name: "Courses", path: "/admin/courses", icon: BookOpen },
      { name: "Branches", path: "/admin/branches", icon: GitBranch },
      { name: "Notice", path: "/admin/authority-notice", icon: File },
      { name: "Analytics", path: "/admin/fees-analytics", icon: File }
    ],
    FACULTY: [
      { name: "Dashboard", path: "/faculty", icon: LayoutDashboard },
      { name: "Attendance", path: "/faculty/attendance", icon: ClipboardList },
      { name: "Assignments", path: "/faculty/assignments", icon: FileText }
    ],
    STUDENT: [
      { name: "Dashboard", path: "/student", icon: LayoutDashboard },
      { name: "Attendance", path: "/student/attendance", icon: ClipboardList },
      { name: "Results", path: "/student/results", icon: GraduationCap }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      
      {/* Brand Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="bg-blue-600 p-1.5 rounded-lg mr-3">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          EduFlow ERP
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">
          Main Menu
        </p>
        
        {menuConfig[role]?.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
              {role?.replace("_", " ")}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-red-600 font-semibold text-sm rounded-xl border border-red-100 hover:bg-red-50 transition-colors group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;