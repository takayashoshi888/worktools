/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategories from './pages/AdminCategories';
import AdminFeedback from './pages/AdminFeedback';
import AdminSecurity from './pages/AdminSecurity';
import AdminSettings from './pages/AdminSettings';
import { ToolProvider } from './context/ToolContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ThemeSwitcher from './components/ThemeSwitcher';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-brand-500">progress_activity</span>
          <p className="text-slate-500 dark:text-slate-400 font-medium">正在验证身份...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Redirect to home if not logged in or not admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <ToolProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ThemeSwitcher />
        </Router>
      </ToolProvider>
    </AuthProvider>
  );
}
