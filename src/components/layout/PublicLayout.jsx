/**
 * PublicLayout Component
 * Layout wrapper for public pages
 */

import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pt-20"
      >
        <Outlet />
      </motion.main>
      
      <Footer />
    </div>
  )
}

export default PublicLayout
