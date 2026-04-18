import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";

import SuperAdminDashboard from "../features/superadmin/pages/Dashboard";
import CreateCollege from "../features/superadmin/pages/CreateCollege";
import CollegesList from "../features/superadmin/pages/CollegesList";




import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AuthorityNoticePage from "../features/admin/pages/authorityNotice/pages/AuthorityNoticePage";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

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
 // =========================
      // ADMIN ROUTES
      // =========================

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