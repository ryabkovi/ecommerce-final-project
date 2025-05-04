import React, { useContext } from "react";
import * as Pages from "./components/pages/adminIndexPages.js";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.jsx";
import Page404 from "./components/fallback/Page404.jsx";
import UnderConstruction from "./components/fallback/UnderConstruction.jsx";

function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Pages.Login />} />

      {/* Protected Admin Routes */}
      {isAuth && (
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Pages.Dashboard />} />
          <Route path="categories" element={<Pages.Categories />} />
          <Route path="managers" element={<Pages.Manager />} />
          <Route path="users" element={<Pages.Users />} />
          <Route path="products" element={<Pages.Products />} />
          <Route path="orders" element={<Pages.Orders />} />
          <Route path="feedback" element={<Pages.Feedback />} />
          <Route path="settings" element={<UnderConstruction />} />
        </Route>
      )}

      {/* Fallback route */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
