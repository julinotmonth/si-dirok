/**
 * AdminLayout Component
 * Layout wrapper for admin panel pages
 */

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Bell, Search, RefreshCcw } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { useAuthStore, useAdminStore } from '../../store'
import toast from 'react-hot-toast'

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuthStore()
  const { resetToDefaults } = useAdminStore()

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua data ke default?')) {
      resetToDefaults()
      toast.success('Data berhasil direset ke default')
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-dark-950/80 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <AdminSidebar 
          isCollapsed={false} 
          setIsCollapsed={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-dark-400 hover:text-red-400 hover:bg-dark-800/50"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Title */}
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-dark-100">Admin Panel</h1>
              <p className="text-xs text-dark-400">Kelola sistem SI-DIROK</p>
            </div>

            {/* Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Cari data..."
                  className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-dark-400 hover:text-primary-400 hover:bg-dark-800/50 transition-all text-sm"
                title="Reset ke Default"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl text-dark-400 hover:text-red-400 hover:bg-dark-800/50 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Admin badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-red-400">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

export default AdminLayout
