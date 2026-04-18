import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";

import SuperAdminDashboard from "../features/superadmin/pages/Dashboard";
import CreateCollege from "../features/superadmin/pages/CreateCollege";
import CollegesList from "../features/superadmin/pages/CollegesList";

// 🔥 FIXED PATHS
import StaffList from "../features/admin/pages/staff/StaffList";
import CreateStaff from "../features/admin/pages/staff/CreateStaff";
import EditStaff from "../features/admin/pages/staff/EditStaff";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* SUPER ADMIN */}
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

      {/* 🔥 STAFF MODULE (FIXED) */}

      <Route
        path="/admin/staff"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <StaffList />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/staff/create"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <CreateStaff />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/staff/edit/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <EditStaff />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;