/**
 * AdminSidebar Component
 * Navigation sidebar for admin panel
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cigarette,
  LayoutDashboard,
  Activity,
  HeartPulse,
  BookOpen,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  GitBranch,
  Home
} from 'lucide-react'
import { useAuthStore } from '../../store'

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const menuItems = [
    {
      title: 'Dashboard',
      items: [
        { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
      ]
    },
    {
      title: 'Data Master',
      items: [
        { to: '/admin/symptoms', icon: Activity, label: 'Data Gejala' },
        { to: '/admin/diseases', icon: HeartPulse, label: 'Data Penyakit' },
        { to: '/admin/rules', icon: GitBranch, label: 'Rule Base' },
      ]
    },
    {
      title: 'Konten',
      items: [
        { to: '/admin/education', icon: BookOpen, label: 'Edukasi' },
      ]
    },
    {
      title: 'Laporan',
      items: [
        { to: '/admin/reports', icon: FileText, label: 'Hasil Diagnosis' },
        { to: '/admin/users', icon: Users, label: 'Pengguna' },
      ]
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-dark-900/80 backdrop-blur-xl border-r border-dark-800/50 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-dark-800/50">
        <Link to="/admin" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <span className="text-lg font-bold text-red-400">ADMIN</span>
                <span className="block text-xs text-dark-400">SI-DIROK Panel</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-b border-dark-800/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="font-medium text-dark-100 truncate">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-xs text-red-400 truncate">
                  Administrator
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-dark-500 uppercase tracking-wider mb-3 px-3"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>
            
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.to
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive
                        ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500'
                        : 'text-dark-300 hover:text-red-400 hover:bg-dark-800/50'
                      }
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-red-400' : ''}`} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-dark-800/50 space-y-2">
        {/* Back to Site */}
        <Link
          to="/"
          className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            text-dark-400 hover:text-primary-400 hover:bg-dark-800/50 transition-all
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? 'Ke Website' : ''}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Ke Website
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl
            text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? 'Keluar' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Keluar
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}

export default AdminSidebar
