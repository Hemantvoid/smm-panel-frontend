import { Navigate } from "react-router-dom";

import useAuthStore
  from "../store/authStore";

export default function RoleProtectedRoute({

  children,

  allowedRole,

}) {

  const token =
  useAuthStore(
    (s) => s.token
  ) || localStorage.getItem("token");

  const role =
  useAuthStore(
    (s) => s.role
  ) || localStorage.getItem("role");

  // =====================================
  // NOT LOGGED IN
  // =====================================
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =====================================
  // WRONG ROLE
  // =====================================
  if (
    role !== allowedRole
  ) {

    // ADMIN trying user routes
    if (
      role === "ROLE_ADMIN"
    ) {

      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    // USER trying admin routes
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}