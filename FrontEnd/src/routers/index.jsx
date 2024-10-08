import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import HomePage from '../pages/Home';
import VoicePage from '../pages/Voice';
// import VoiceCloningCreatePage from '../pages/VoiceCloningCreate';
import AccountPage from '../pages/Account';
import UserManagementPage from '../pages/UserManagement';
import ProtectedRoute from './ProtectedRoute';
import { getToken } from '../utils/localStorage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/voice-cloning"
        element={
          <ProtectedRoute>
            <VoicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={getToken() ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={getToken() ? <Navigate to="/" /> : <RegisterPage />}
      />
      {/* <Route
        path="/create"
        element={
          <ProtectedRoute>
            <VoiceCloningCreatePage />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
