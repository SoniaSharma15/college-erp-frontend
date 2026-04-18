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
// 🔥 FIXED PATHS
import StaffList from "../features/admin/pages/staff/StaffList";
import CreateStaff from "../features/admin/pages/staff/CreateStaff";
import EditStaff from "../features/admin/pages/staff/EditStaff";// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AuthorityNoticePage from "../features/admin/pages/authorityNotice/pages/AuthorityNoticePage";

const AppRoutes = () => {
  return (
    <Routes>

      {/* AUTH */}
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* ================= SUPER ADMIN ================= */}

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
    
      <Route
        path="/admin/authority-notice"
        element={
          // <ProtectedRoute>
              <AuthorityNoticePage />
          // </ProtectedRoute> 
        }
      />

    </Routes>
  );
};

export default AppRoutes;