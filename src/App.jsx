import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import AuthLayout from './components/layout/AuthLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Education from './pages/public/Education'
import EducationDetail from './pages/public/EducationDetail'
import FAQ from './pages/public/FAQ'
import Contact from './pages/public/Contact'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// User Pages
import UserDashboard from './pages/user/Dashboard'
import Consultation from './pages/user/Consultation'
import DiagnosisResult from './pages/user/DiagnosisResult'
import History from './pages/user/History'
import Profile from './pages/user/Profile'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import ManageSymptoms from './pages/admin/Symptoms'
import ManageDiseases from './pages/admin/Diseases'
import ManageEducation from './pages/admin/Education'
import ManageRules from './pages/admin/Rules'
import Reports from './pages/admin/Reports'
import ManageUsers from './pages/admin/Users'

// Guards
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:id" element={<EducationDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/result" element={<DiagnosisResult />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/symptoms" element={<ManageSymptoms />} />
          <Route path="/admin/diseases" element={<ManageDiseases />} />
          <Route path="/admin/education" element={<ManageEducation />} />
          <Route path="/admin/rules" element={<ManageRules />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

// 404 Component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text">404</h1>
        <p className="text-xl text-dark-400 mt-4">Halaman tidak ditemukan</p>
        <a href="/" className="btn-glow inline-block mt-8">
          <span>Kembali ke Beranda</span>
        </a>
      </div>
    </div>
  )
}

export default App