import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Resources } from './pages/Resources';
import { Reservations } from './pages/Reservations';
import { UserManagement } from './pages/UserManagement';
import { useAuth } from './lib/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { UNSAFE_NavigationContext } from 'react-router-dom';

// Configurar flags do React Router v7
const router = UNSAFE_NavigationContext.router;
if (router) {
  router.future = {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  };
}

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/resources" 
            element={
              <PrivateRoute>
                <Resources />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reservations" 
            element={
              <PrivateRoute>
                <Reservations />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <PrivateRoute requireAdmin>
                <UserManagement />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;