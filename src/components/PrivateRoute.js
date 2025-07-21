import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  const isValid = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
  return isValid ? children : <Navigate to="/login" />;
} 