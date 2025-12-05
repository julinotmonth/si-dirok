/**
 * Loader Component
 * Loading spinner and skeleton loaders
 */

import { motion } from 'framer-motion'

// Spinner Loader
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
    xl: 'w-20 h-20 border-4',
  }

  return (
    <div
      className={`
        ${sizes[size]}
        border-dark-600 border-t-primary-500
        rounded-full animate-spin
        ${className}
      `}
    />
  )
}

// Full Page Loader
export const PageLoader = ({ message = 'Memuat...' }) => {
  return (
    <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-dark-700 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-dark-300 font-medium">{message}</p>
      </motion.div>
    </div>
  )
}

// Processing Loader (for diagnosis)
export const ProcessingLoader = ({ message = 'Memproses diagnosis...', subMessage = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-dark-700"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center pulse */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.p
        className="mt-6 text-lg font-medium text-dark-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
      
      {subMessage && (
        <motion.p
          className="mt-2 text-sm text-dark-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {subMessage}
        </motion.p>
      )}
      
      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

// Skeleton Loader
export const Skeleton = ({ 
  width, 
  height, 
  rounded = 'md', 
  className = '' 
}) => {
  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  return (
    <div
      className={`
        bg-dark-700/50 animate-pulse
        ${roundedStyles[rounded]}
        ${className}
      `}
      style={{ width, height }}
    />
  )
}

// Card Skeleton
export const CardSkeleton = ({ lines = 3 }) => {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton height="24px" width="60%" rounded="md" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            height="16px" 
            width={i === lines - 1 ? '40%' : '100%'} 
            rounded="sm" 
          />
        ))}
      </div>
    </div>
  )
}

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-dark-800">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton height="20px" width={i === 0 ? '80%' : '60%'} rounded="sm" />
        </td>
      ))}
    </tr>
  )
}

export default Spinner
