/**
 * Sidebar Component
 * Navigation sidebar for user dashboard
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cigarette,
  LayoutDashboard,
  Stethoscope,
  History,
  User,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Settings
} from 'lucide-react'
import { useAuthStore } from '../../store'

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const menuItems = [
    {
      title: 'Menu Utama',
      items: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/consultation', icon: Stethoscope, label: 'Konsultasi' },
        { to: '/history', icon: History, label: 'Riwayat' },
      ]
    },
    {
      title: 'Lainnya',
      items: [
        { to: '/education', icon: BookOpen, label: 'Edukasi' },
        { to: '/profile', icon: User, label: 'Profil' },
        { to: '/faq', icon: HelpCircle, label: 'Bantuan' },
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
      className="fixed left-0 top-0 h-screen bg-dark-900/50 backdrop-blur-xl border-r border-dark-800/50 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-dark-800/50">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Cigarette className="w-5 h-5 text-dark-950 transform -rotate-45" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <span className="text-lg font-bold gradient-text">SI-DIROK</span>
                <span className="block text-xs text-dark-400">Dashboard</span>
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

      {/* User Info */}
      <div className="p-4 border-b border-dark-800/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-dark-950" />
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
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-dark-400 truncate">
                  {user?.email || 'user@example.com'}
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
                        ? 'bg-primary-500/10 text-primary-400 border-l-2 border-primary-500'
                        : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                      }
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />
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

      {/* Logout Button */}
      <div className="p-4 border-t border-dark-800/50">
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

export default Sidebar
