/**
 * Navbar Component
 * Main navigation bar for public pages
 */

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Cigarette, 
  Home,
  Info,
  BookOpen,
  HelpCircle,
  Mail,
  LogIn,
  UserPlus,
  User,
  LayoutDashboard,
  LogOut,
  Shield
} from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../common/Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/about', label: 'Tentang', icon: Info },
    { to: '/education', label: 'Edukasi', icon: BookOpen },
    { to: '/faq', label: 'FAQ', icon: HelpCircle },
    { to: '/contact', label: 'Kontak', icon: Mail },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-950/90 backdrop-blur-xl border-b border-dark-800/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cigarette className="w-5 h-5 text-dark-950 transform -rotate-45" />
            </motion.div>
            <div>
              <span className="text-xl font-bold gradient-text">SI-DIROK</span>
              <span className="hidden sm:block text-xs text-dark-400">Sistem Pakar Diagnosis</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
                >
                  {user?.role === 'admin' ? (
                    <Shield className="w-4 h-4" />
                  ) : (
                    <LayoutDashboard className="w-4 h-4" />
                  )}
                  {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800/50 border border-dark-700/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-dark-950" />
                  </div>
                  <span className="text-sm font-medium text-dark-200">
                    {user?.username || 'User'}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-dark-800/50">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = location.pathname === link.to
                  
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'text-primary-400 bg-primary-500/10'
                          : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  )
                })}
                
                <div className="border-t border-dark-800/50 pt-4 mt-4 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        Keluar
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all"
                      >
                        <LogIn className="w-5 h-5" />
                        Masuk
                      </Link>
                      <Link to="/register" className="block px-4">
                        <Button variant="primary" fullWidth leftIcon={<UserPlus className="w-4 h-4" />}>
                          Daftar Sekarang
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar
