import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, allow = [] }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <section className="section">
        <div className="container">Loading secure area...</div>
      </section>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allow.length && !allow.includes(session.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
