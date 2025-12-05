/**
 * AdminRoute Component
 * Restricts access to admin users only
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== 'admin') {
    // Redirect non-admin users to dashboard
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminRoute
