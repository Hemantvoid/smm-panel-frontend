import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Login from "./Login";

import Register from "./Register";

import Home from "./pages/Home";

import Dashboard from "./Dashboard";

import Orders from "./pages/Orders";

import NewOrder from "./pages/NewOrder";

import AddFunds from "./pages/AddFunds";

import Support from "./pages/Support";

import Account from "./pages/Account";

import AdminDashboard from "./pages/AdminDashboard";

import AdminProviders from "./pages/AdminProviders";

import AdminServices from "./pages/AdminServices";

import AdminOrders from "./pages/AdminOrders";

import Settings from "./pages/admin/Settings";

import UserLayout from "./components/UserLayout";

import AdminLayout from "./components/AdminLayout";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

import OAuthSuccess from "./pages/OAuthSuccess";

import ForgotPassword from "./ForgotPassword"; 

import ResetPassword from "./ResetPassword";

import AdminTickets from "./pages/AdminTickets";

import AdminWalletRequests from "./pages/AdminWalletRequests";

import ApiDocumentation from "./pages/ApiDocumentation";

export default function App() {

  return (

    <>

      <Toaster position="top-right" />

      <Routes>

        {/* ========================= */}
        {/* PUBLIC */}
        {/* ========================= */}

        <Route
          path="/oauth-success"
          element={<OAuthSuccess />}
        />

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================= */}
        {/* USER */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute
              allowedRole="ROLE_USER"
            >

              <UserLayout />

            </RoleProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="order"
            element={<NewOrder />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="funds"
            element={<AddFunds />}
          />

          <Route
            path="api-docs"
            element={<ApiDocumentation />}
          />

          <Route
            path="support"
            element={<Support />}
          />

          <Route
            path="account"
            element={<Account />}
          />

        </Route>

        {/* ========================= */}
        {/* ADMIN */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute
              allowedRole="ROLE_ADMIN"
            >

              <AdminLayout />

            </RoleProtectedRoute>
          }
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="providers"
            element={<AdminProviders />}
          />

          <Route
            path="services"
            element={<AdminServices />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="tickets"
            element={<AdminTickets />}
          />    

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="/admin/wallet-requests"
            element={<AdminWalletRequests />}
          />

        </Route>

      </Routes>

    </>

  );
}