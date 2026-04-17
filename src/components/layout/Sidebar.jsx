import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles[0];

  const menuConfig = {
    SUPER_ADMIN: [
      { name: "Dashboard", path: "/superadmin" },
      { name: "Create College", path: "/superadmin/create-college" },
      { name: "Colleges", path: "/superadmin/colleges" }
    ],

    COLLEGE_ADMIN: [
      { name: "Dashboard", path: "/admin" },
      { name: "Staff", path: "/admin/staff" },
      { name: "Departments", path: "/admin/departments" },
      { name: "Courses", path: "/admin/courses" },
      { name: "Branches", path: "/admin/branches" }
    ],

    FACULTY: [
      { name: "Dashboard", path: "/faculty" },
      { name: "Attendance", path: "/faculty/attendance" },
      { name: "Assignments", path: "/faculty/assignments" }
    ],

    STUDENT: [
      { name: "Dashboard", path: "/student" },
      { name: "Attendance", path: "/student/attendance" },
      { name: "Results", path: "/student/results" }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      
      {/* Logo / Title */}
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        ERP System
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
        {menuConfig[role]?.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block p-2 rounded ${
                isActive
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm mb-2">{user?.name}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;