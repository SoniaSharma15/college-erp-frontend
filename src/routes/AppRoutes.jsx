// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

// Auth
import Login from "../features/auth/pages/Login";

// Super Admin
import SuperAdminDashboard from "../features/superadmin/pages/Dashboard";
import CreateCollege from "../features/superadmin/pages/CreateCollege";
import CollegesList from "../features/superadmin/pages/CollegesList";

// Admin
import AdminDashboard from "../features/admin/pages/Dashboard";
import ManageCourses from "../features/admin/pages/ManageCourses";
import ManageBranches from "../features/admin/pages/ManageBranches";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Login />} />

      {/* ================= SUPER ADMIN ================= */}

      <Route
        path="/superadmin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
              <SuperAdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/create-college"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
              <CreateCollege />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/colleges"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
              <CollegesList />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= COLLEGE ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["COLLEGE_ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["COLLEGE_ADMIN"]}>
              <ManageCourses />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/branches"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["COLLEGE_ADMIN"]}>
              <ManageBranches />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;